import { IPraise } from '@shared/types/types'
import confettiAnimation from '@public/animations/confetti.json'
import applauseAnimation from '@public/animations/applause.json'
import thumbsUpAnimation from '@public/animations/thumbs-up.json'
import trophyAnimation from '@public/animations/trophy.json'
import medalAnimation from '@public/animations/medal.json'
import cakeAnimation from '@public/animations/cake.json'

export const PRAISES: IPraise[] = [
  {
    id: 1,
    title: 'Confetti',
    description:
      'Confetti is a small pieces of paper, mylar, or metallic material which is usually thrown at celebrations, especially parades and weddings.',
    animationData: confettiAnimation,
  },
  {
    id: 2,
    title: 'Applause',
    description:
      'Applause is primarily the expression of approval by the act of clapping, or striking the palms of the hands together, in order to create noise.',
    animationData: applauseAnimation,
  },
  {
    id: 3,
    title: 'Thumbs Up',
    description:
      'The thumbs-up is a sign of approval in most countries. However, it can also be used as an insult in some countries.',
    animationData: thumbsUpAnimation,
  },
  {
    id: 4,
    title: 'Trophy',
    description:
      'A trophy is a tangible, durable reminder of a specific achievement, and serves as recognition or evidence of merit.',
    animationData: trophyAnimation,
  },
  {
    id: 5,
    title: 'Medal',
    description:
      'A medal is a small, flat, and round piece of metal that is given as an award for a particular achievement.',
    animationData: medalAnimation,
  },
  {
    id: 6,
    title: 'Cake',
    description:
      'A cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked.',
    animationData: cakeAnimation,
  },
]
