import type { ReactNode } from 'react';

export type Slide = {
  id: string;
  /** Background photo path */
  image: string;
  headline: ReactNode;
  sub: ReactNode;
  /** Optional object-position for cropping on different aspect ratios */
  objectPosition?: string;
};

const img = (name: string) => encodeURI(`/imageforslider/${name}`);

export const slides: Slide[] = [
  {
    id: 'everywhere',
    image: img('Slide6.jpeg'),
    headline: <>The money access for everyone everywhere.</>,
    sub: (
      <>
        <strong className="font-bold">
          Just <em className="not-italic text-biomonie-lemon">YOU</em>.
          <br />
          Nothing carried. No password. Nothing else.
        </strong>
      </>
    ),
    objectPosition: '50% 25%',
  },
  {
    id: 'access',
    image: img('slide1.png'),
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">YOU</em> are the access
        to your money.
      </>
    ),
    sub: <>Flex, pay or spend and earn.</>,
    objectPosition: '72% 20%',
  },
  {
    id: 'hard',
    image: img('YOUworkhardforyourmoney.jpg'),
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">YOU</em> work hard for
        your money.
      </>
    ),
    sub: <>Spending it shouldn&apos;t be hard. Just flex, pay or spend.</>,
    objectPosition: '68% 25%',
  },
  {
    id: 'show',
    image: img('Showupflexandearnimage.jpg'),
    headline: (
      <>
        Show up, <em className="not-italic text-biomonie-lemon">flex, pay </em> or  <em className="not-italic text-biomonie-lemon">spend</em> and
        earn.
      </>
    ),
    sub: <>Just transact and earn.</>,
    objectPosition: '70% 20%',
  },
  {
    id: 'safety1',
    image: img('YOUareyourmoneyaccessimage.jpg'),
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">YOU</em> are the money
        access.
      </>
    ),
    sub: <> And that's on period...</>,
    objectPosition: '68% 20%',
  },
  {
    id: 'safety2',
    image: img('WithYoubeingtheMoneyAccess.jpg'),
    headline: (
      <>
        With <em className="not-italic text-biomonie-lemon">YOU</em> being the
        money access.
      </>
    ),
    sub: <>Safety is always on.</>,
    objectPosition: '72% 20%',
  },
  {
    id: 'netgain',
    image: img('BimoniealwaysaNetgain.jpg'),
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">BIOMONIE</em>. Always a
        Net-Gain.
      </>
    ),
    sub: <>Built-in value every time you transact.</>,
    objectPosition: '65% 20%',
  },
  {
    id: 'encryptkey',
    image: img('EncryptKeyImage.png'),
    headline: (
      <>
        Secure by Design with{' '}
        <em className="not-italic text-[#7EBCF8]">EncryptKey</em>...
      </>
    ),
    sub: <>Enterprise-grade encryption using the HSM, fraud monitoring, and compliance controls protect every transaction.</>,
    objectPosition: 'center center',
  },
];
