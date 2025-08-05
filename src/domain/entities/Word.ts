export class Word {
  public id: number;
  public name: string;
  public imageUrl: string;
  public soundUrl: string;
  public genre: string;

  constructor(
    id: number,
    name: string,
    imageUrl: string,
    soundUrl: string,
    genre: string
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.soundUrl = soundUrl;
    this.genre = genre;
  }
}