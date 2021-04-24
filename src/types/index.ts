export type ParsedTime = {
  valid: boolean,
  value: string,
};

export type Format = '12hm' | '12hms' | '24hm' | '24hms';

export type Format12Hr = 'h:mm a' | 'h:mm:ss a';
export type Format24Hr = 'HH:mm' | 'HH:mm:ss';