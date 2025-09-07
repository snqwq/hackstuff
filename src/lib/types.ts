export interface Item {
  id: string
  name: string | null
  description: string | null
  price: string | null
  image_url: string | null
  external_link: string | null
  tags: string[] | null
  featured: boolean | null
  created_at?: string
}