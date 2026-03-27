export interface IUser {
  id: string
  name: string
  age: number
  description1: string
  description2: string
  techStack: string
  universityName: string
  email: string
  phoneNumber: string
  githubLink: string
  linkednLink: string
  wpLink: string
  // Yeni eklenen alanlar (Backend'den gelen string yollar)
  cvPathTR: string;
  cvPathEN: string;
}