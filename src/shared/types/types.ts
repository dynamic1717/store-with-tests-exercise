export type LottieVariants =
  | 'confetti'
  | 'applause'
  | 'thumbs-up'
  | 'trophy'
  | 'medal'
  | 'cake'

export interface IPraise {
  id: number
  title: string
  description: string
  price: number
  image: string
  lottieId: LottieVariants
}
