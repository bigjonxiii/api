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
  path: '/jtd/{macAddress}/{ipAddress}',
  handler: (req, h) => {
    console.log(req.params);
    return {
      SecondResolution: req.query.SecondResolution || '400x224',
      Description: req.query.Description || {},
      MainResolution: req.query.MainResolution || '1920x1080',
      SecondRTMPAppName: req.query.SecondRTMPAppName || 'live\\/yourstreamlive',
      MainRTMPAppName: req.query.MainRTMPAppName || 'live\\/yourstreamlive',
      PollURL:
        req.query.PollURL ||
        'http://companyname.yourstreamlive.com/companynamestatus/',
      SecondRTMPServerIP: req.query.SecondRTMPServerIP || 'not_used',
      MainBitrate: req.query.MainBitrate || '1000',
      MainRTMPStreamName: req.query.MainRTMPStreamName || 'not_used',
      MainRTMPServerIPEnabled: req.query.MainRTMPServerIPEnabled || '1',
      ScheduleIDEnabled: req.query.ScheduleIDEnabled || '0',
      SecondBitrate: req.query.SecondBitrate || '350',
      MainRTMPServerIP: req.query.MainRTMPServerIP || 'not_used',
      SecondRTMPStreamName: req.query.SecondRTMPStreamName || 'not_used',
      AudioInput: req.query.AudioInput || '1',
      SecondRTMPServerIPEnabled: req.query.SecondRTMPServerIPEnabled || '0',
    };
  },
});

server.route({
  method: 'GET',
  path: '/{p*}',
  handler: (req, h) => {
  console.log("intercept request");
  console.log(req.params)
      const ip = req.info.remoteAddress;
      console.log(ip)
  return 'ok';
  }
  }
);
server.route({
  method: 'GET',
  path: '/random-resolution',
  handler: (req, h) => {
    const mainResolutionX = Math.floor(Math.random() * 1000);
    const mainResolutionY = Math.floor(Math.random() * 1000);
    const secondResolutionX = Math.floor(Math.random() * 1000);
    const secondResolutionY = Math.floor(Math.random() * 1000);
    return {
      SecondResolution: `${secondResolutionX}x${secondResolutionY}`,
      Description: {},
      MainResolution: `${mainResolutionX}x${mainResolutionY}`,
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
