import React from 'react';

export const metadata = {
  title: 'About Me',
  description: 'Learn more about the author of this blog.',
};

export default function About() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="prose dark:prose-invert lg:prose-xl">
        <p>
          Welcome to my personal blog and portfolio site! My name is [Your Name Here - TODO: Replace] and I am a [Your Profession/Role - TODO: Replace].
        </p>
        <p>
          I created this space to share my thoughts on [Topics you write about - TODO: Replace], showcase my projects, and connect with others in the field.
        </p>
        <p>
          Feel free to browse my blog posts and portfolio. You can reach out to me via [Contact Method - e.g., email, social media link - TODO: Replace].
        </p>
        <p>
          Thanks for visiting!
        </p>
      </div>
    </section>
  );
}
