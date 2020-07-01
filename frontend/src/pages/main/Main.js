import React from 'react';

import { TextBox } from 'components/schema';
import { FirstParagraph, Paragraph, H1, H2, H3, H4, BlockQuote } from 'components/typography';

const Main = () => {
  return (
    <TextBox>
      <H1>Test av header 1</H1>
      <H2>Test av header 2</H2>
      <H3>Test av header 3</H3>
      <H4>Test av header 4</H4>
      <BlockQuote>
        Morbi congue velit sapien, at accumsan turpis efficitur eu. Duis finibus lacus mi, et
        sodales dui lobortis nec.
      </BlockQuote>

      <FirstParagraph>
        Main Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae consectetur tortor.
        Suspendisse potenti. Phasellus dignissim, nibh quis tempor porttitor, ipsum quam laoreet
        nisl, eu condimentum felis lacus et erat. Donec ultrices fermentum diam. Nulla pulvinar mi
        metus. Nullam et risus sit amet nisl maximus porttitor at eu dolor. Sed metus dolor,
        consectetur in odio quis, rutrum facilisis augue. Duis sed nibh ut risus sodales tincidunt.
        Nulla at euismod libero. Morbi congue velit sapien, at accumsan turpis efficitur eu. Duis
        finibus lacus mi, et sodales dui lobortis nec. Curabitur porta est eget bibendum sagittis.
        Nam cursus molestie augue, sed pellentesque massa finibus a. Suspendisse facilisis posuere
        metus et rhoncus. Morbi ultricies dui eu lorem sodales pretium. purus.
      </FirstParagraph>
      <Paragraph>
        Nullam et ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae consectetur tortor.
        Suspendisse potenti. Phasellus dignissim, nibh quis tempor porttitor, ipsum quam laoreet
        nisl, eu condimentum felis lacus et erat. Donec ultrices fermentum diam. Nulla pulvinar mi
        metus. Nullam et risus sit amet nisl maximus porttitor at eu dolor. Sed metus dolor,
        consectetur in odio quis, rutrum facilisis augue. Duis sed nibh ut risus sodales tincidunt.
        Nulla at euismod libero. Morbi congue velit sapien, at accumsan turpis efficitur eu. Duis
        finibus lacus mi, et sodales dui lobortis nec. Curabitur porta est eget bibendum sagittis.
        Nam cursus molestie augue, sed pellentesque massa finibus a. Suspendisse facilisis posuere
        metus et rhoncus. Morbi ultricies dui eu lorem sodales pretium. purus.
      </Paragraph>
      <Paragraph>
        Suspendisse ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae consectetur tortor.
        Suspendisse potenti. Phasellus dignissim, nibh quis tempor porttitor, ipsum quam laoreet
        nisl, eu condimentum felis lacus et erat. Donec ultrices fermentum diam. Nulla pulvinar mi
        metus. Nullam et risus sit amet nisl maximus porttitor at eu dolor. Sed metus dolor,
        consectetur in odio quis, rutrum facilisis augue. Duis sed nibh ut risus sodales tincidunt.
        Nulla at euismod libero. Morbi congue velit sapien, at accumsan turpis efficitur eu. Duis
        finibus lacus mi, et sodales dui lobortis nec. Curabitur porta est eget bibendum sagittis.
        Nam cursus molestie augue, sed pellentesque massa finibus a. Suspendisse facilisis posuere
        metus et rhoncus. Morbi ultricies dui eu lorem sodales pretium. purus.
      </Paragraph>
    </TextBox>
  );
};

export default Main;
