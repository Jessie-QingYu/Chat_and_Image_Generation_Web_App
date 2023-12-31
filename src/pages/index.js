import { useState } from 'react';
import Head from 'next/head'
import { createParser } from 'eventsource-parser';

import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Form from '@/components/Form';
import FormRow from '@/components/FormRow';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';

import styles from '@/styles/Home.module.scss'


function getFieldFromFormByName({ name, form } = {}) {
  const fields = Array.from(form?.elements);
  return fields.find(el => el?.name === name);
}

export default function Home() {
  const [text, setText] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function handleOnGenerateText(e) {
    e.preventDefault();

    const { value: prompt } = getFieldFromFormByName({
      name: 'prompt-chat',
      form: e.currentTarget
    });

    setIsLoading(true);
    setText(undefined);

    const response = await fetch('/api/chat-stream', {
      method: 'POST',
      body: JSON.stringify({
        prompt
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    function onParse(event) {
      if (event.type === 'event') {
        try {
          const data = JSON.parse(event.data);
          data.choices
            .filter(({ delta }) => !!delta.content)
            .forEach(({ delta }) => {
              setText(prev => {
                return `${prev || ''}${delta.content}`;
              })
            });
        } catch (e) {
          console.log(e)
        }
      }
    }

    const parser = createParser(onParse)

    while (true) {
      const { value, done } = await reader.read();
      const dataString = decoder.decode(value);
      if (done || dataString.includes('[DONE]')) break;
      parser.feed(dataString);
    }

    setIsLoading(false);
  }


  async function handleOnGenerateImage(e) {
    e.preventDefault();

    const { value: prompt } = getFieldFromFormByName({
      name: 'prompt-image',
      form: e.currentTarget
    });

    setIsLoading(true);
    setImage(undefined);

    const { image } = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify({
        prompt
      })
    }).then(res => res.json());

    setImage(image);
    setIsLoading(false);
  }

  return (
    <Layout>
      <Head>
        <title>Image Generator</title>
        <meta name="description" content="Generate an image!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        <Container size="content">
          <Form className={styles.form} onSubmit={handleOnGenerateText}>
            <h2>Generate Chat Completion</h2>
            <FormRow>
              <FormInput type="text" name="prompt-chat" />
            </FormRow>
            <FormRow>
              <Button disabled={isLoading}>Generate</Button>
            </FormRow>
          </Form>
          {text && <p>{text}</p>}
        </Container>
      </Section>
      <Section>
        <Container size="content">
          <Form className={styles.form} onSubmit={handleOnGenerateImage}>
            {image && (<img src={image} alt="Generated Image" />)}
            <h2>Generate an Image</h2>
            <FormRow>
              <FormInput type="text" name="prompt-image" />
            </FormRow>
            <FormRow>
              <Button disabled={isLoading}>Generate</Button>
            </FormRow>
          </Form>
        </Container>
      </Section>
    </Layout>
  )
}