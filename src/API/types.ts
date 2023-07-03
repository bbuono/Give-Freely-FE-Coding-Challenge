export type ParticipantsResponse = {
  record: {
    websites: Array<{
      name: string;
      url: string;
      messages: string[];
    }>;
  };
};
