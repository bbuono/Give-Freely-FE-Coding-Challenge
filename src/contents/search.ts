import type { PlasmoCSConfig } from 'plasmo';

import {
  Channel,
  ChannelName,
  Client,
  ContentCommunicationChannel,
  type ParticipantsChangeMessage,
} from '~communication-channel';
import { onDomContentLoaded } from '~contents-utils/onDomContentLoaded';
import { getParticipantElements } from '~utils/getParticipantElements';

export const config: PlasmoCSConfig = {
  matches: ['https://*.google.com/search*', 'https://*.google.com.ar/search*'],
};

async function domContentLoaded(): Promise<void> {
  const channel = new ContentCommunicationChannel({
    channelName: ChannelName.GOOGLE,
    client: Client.SEARCH,
    clients: [Client.BELL, Client.SEARCH, Client.MODAL],
  });

  await channel.initialize();

  const fetchParticipantsResponse = await channel.fetchParticipants();

  if (!fetchParticipantsResponse.success) {
    throw new Error(fetchParticipantsResponse.message);
  }

  const participants = fetchParticipantsResponse.payload;

  const applyStyles = (element: Element): void => {
    if (element instanceof HTMLElement) {
      element.style.border = '1px solid red';
    }
  };

  const [matchedParticipants, matchedElements] =
    getParticipantElements(participants);

  matchedElements.forEach(applyStyles);

  await channel.broadcast<ParticipantsChangeMessage>(
    Channel.PARTICIPANTS_CHANGE,
    { participants: matchedParticipants },
  );
}

function main(): void {
  onDomContentLoaded(domContentLoaded);
}

void main();
