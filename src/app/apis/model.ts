export interface Contact {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  contacts: Contact[];
}
