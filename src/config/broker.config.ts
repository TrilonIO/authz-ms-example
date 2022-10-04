import { registerAs } from '@nestjs/config';

export default registerAs('broker', () => {
  return {
    brokerUri: process.env.BROKER_URI,
    queue: process.env.QUEUE,
  };
});
