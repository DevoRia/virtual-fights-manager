export interface Message {
  message_id: number,
  from: {
    id: number,
    is_bot: boolean,
    first_name: string,
    username: string,
    language_code: string
  },
  chat: {
    id: number,
    title: string,
    first_name: string,
    username: string,
    type: Type,
    all_members_are_administrators: boolean
  },
    date: number,
    text: string,
    entities: { offset: number, length: number, type: string }[],
    new_chat_members:
      {
            id: number,
            is_bot: boolean,
            first_name: string,
            username: string
      }[],
  photo? : {
    file_id: string,
    file_unique_id: string,
    file_size: number,
    width: number,
    height: number,
  }[],
  document?: {
    file_name: string,
    mime_type: string,
    file_id: string,
    file_unique_id: string,
    file_size: number,
    thumb?: {
      file_id: string,
      file_unique_id: string,
      file_size: number,
      width: number,
      height: number
    },
  }
  
}

export enum Type {
  PRIVATE = 'private',
  GROUP = 'group'
}