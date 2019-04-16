import hapi from 'hapi';
import mongoose from 'mongoose';
import { Proxy } from './model/proxy';

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

const server = new hapi.Server({ port: 3000, host: 'localhost' });

server.route({
  method: 'GET',
  path: '/proxies',
  handler: (req, h) => {
    const limit =
      typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 10;

    return Proxy.find(
      { is_valid: true },
      {
        _id: 0,
        crawled_at: 0,
        invalid_count: 0,
      }
    )
      .sort({ verified_at: -1 })
      .limit(limit);
  },
});


server.route({
  method: 'GET',
  path: '/jtd/{mac}',
  handler: (req, h) => {
    return {
      SecondResolution: '384x216',
      Description: {},
      MainResolution: '640x360',
      SecondRTMPAppName: 'live\\/yourstreamlive',
      MainRTMPAppName: 'live\\/yourstreamlive',
      PollURL: 'http://companyname.yourstreamlive.com/companynamestatus/',
      SecondRTMPServerIP: 'not_used',
      MainBitrate: '1000',
      MainRTMPStreamName: 'not_used',
      MainRTMPServerIPEnabled: '1',
      ScheduleIDEnabled: '0',
      SecondBitrate: '350',
      MainRTMPServerIP: 'not_used',
      SecondRTMPStreamName: 'not_used',
      AudioInput: '0',
      SecondRTMPServerIPEnabled: '0',
    };
  },
});


async function init() {
  mongoose.connect('mongodb://localhost/api', { useNewUrlParser: true });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

init();
