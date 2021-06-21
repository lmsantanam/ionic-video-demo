import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { Video } from '../model/video';

export const setVideoPlayer = async (): Promise<any> => {
  const platform = Capacitor.getPlatform();
  return { plugin: CapacitorVideoPlayer, platform };
};

@Component({
  selector: 'app-video1',
  templateUrl: './video1.page.html',
  styleUrls: ['./video1.page.scss'],
})
export class Video1Page implements OnInit {

  video: Video = {
    title: 'Bike',
    thumbnail: 'https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/images/Bike.jpg',
    description: 'This is a racing bike video\nLorem ipsum dolor sit amet, consectetur adipiscing elit.',
    url: 'https://raw.githubusercontent.com/jepiqueau/jeep/master/assets/videos/Bike720.mp4'
  };

  videoPlayer: any = {};
  videoMode = '';

  handlerPlay: any;
  handlerPause: any;
  handlerEnded: any;
  handlerReady: any;
  handlerExit: any;
  first = false;
  apiTimer1: any;
  apiTimer2: any;
  apiTimer3: any;
  testApi = true;
  subtitle: string = null;
  language: string = null;
  subtitleOptions: any = null;

  constructor() { }

  async ngOnInit() {
    console.log('ngOnInit - VIDEO 1');
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter - VIDEO 1');
    const player: any = await setVideoPlayer();
    this.videoPlayer = player.plugin;
    this.videoMode = 'fullscreen';
    await this.addListenersToPlayerPlugin();
    console.log('video > ' + JSON.stringify(this.video));
  }

  async ionViewWillLeave() {
    await this.leavePlayer();
  }

  async play() {
    console.log('PLAY video 1');

    const res: any = await this.videoPlayer.initPlayer({
      mode: this.videoMode,
      url: this.video.url,
      subtitle: this.subtitle,
      language: this.language,
      subtitleOptions: this.subtitleOptions,
      playerId: 'fullscreen',
      componentTag: 'app-video1'
    });
    console.log(`res ${JSON.stringify(res)}`);
  }

  async addListenersToPlayerPlugin(): Promise<void> {
    this.handlerPlay = await this.videoPlayer.addListener(
      'jeepCapVideoPlayerPlay', (data: any) => this.playerPlay(data), false);
    this.handlerPause = await this.videoPlayer.addListener(
      'jeepCapVideoPlayerPause', (data: any) => this.playerPause(data), false);
    this.handlerEnded = await this.videoPlayer.addListener(
      'jeepCapVideoPlayerEnded', (data: any) => this.playerEnd(data), false);
    this.handlerExit = await this.videoPlayer.addListener(
      'jeepCapVideoPlayerExit', (data: any) => this.playerExit(data), false);
    this.handlerReady = await this.videoPlayer.addListener(
      'jeepCapVideoPlayerReady', async (data: any) => this.playerReady(data), false);
  }

  async playerPlay(data: any): Promise<void> {
    console.log(`Event jeepCapVideoPlayerPlay ${data}`);
    return;
  }

  async playerPause(data: any): Promise<void> {
    console.log(`Event jeepCapVideoPlayerPause ${data}`);
    return;
  }

  async playerEnd(data: any): Promise<void> {
    console.log(`Event jeepCapVideoPlayerEnded ${data}`);
    await this.leavePlayer();
    return;
  }

  async playerExit(data: any): Promise<void> {
    console.log(`Event jeepCapVideoPlayerExit ${data}`);
    await this.leavePlayer();
    return;
  }

  async playerReady(data: any): Promise<void> {
    console.log(`Event jeepCapVideoPlayerReady ${data}`);
    console.log(`testVideoPlayerPlugin testAPI ${this.testApi}`);
    console.log(`testVideoPlayerPlugin first ${this.first}`);
    if (this.testApi && this.first) {
      // test the API
      this.first = false;
      console.log('testVideoPlayerPlugin calling isPlaying ');
      let isPlaying = await this.videoPlayer.isPlaying({ playerId: 'fullscreen' });
      console.log(` isPlaying ${isPlaying}`);
      this.apiTimer1 = setTimeout(async () => {
        let pause = await this.videoPlayer.pause({ playerId: 'fullscreen' });
        console.log(`pause ${pause}`);
        isPlaying = await this.videoPlayer.isPlaying({ playerId: 'fullscreen' });
        console.log(`const isPlaying after pause ${isPlaying}`);
        const currentTime = await this.videoPlayer.getCurrentTime({ playerId: 'fullscreen' });
        console.log('const currentTime ', currentTime);
        let muted = await this.videoPlayer.getMuted({ playerId: 'fullscreen' });
        if (muted.value) {
          console.log('getMuted true');
        } else {
          console.log('getMuted false');
        }
        let setMuted = await this.videoPlayer.setMuted({ playerId: 'fullscreen', muted: !muted.value });
        if (setMuted.value) {
          console.log('setMuted true');
        } else {
          console.log('setMuted false');
        }
        muted = await this.videoPlayer.getMuted({ playerId: 'fullscreen' });
        if (muted.value) {
          console.log('getMuted true');
        } else {
          console.log('getMuted false');
        }
        let duration = await this.videoPlayer.getDuration({ playerId: 'fullscreen' });
        console.log(`duration ${duration}`);
        // valid for movies havin a duration > 25
        const seektime = currentTime.value + 0.5 * duration.value < duration.value - 25 ? currentTime.value + 0.5 * duration.value
          : duration.value - 25;
        let setCurrentTime = await this.videoPlayer.setCurrentTime({ playerId: 'fullscreen', seektime });
        console.log('setCurrentTime ', setCurrentTime.value);
        let play = await this.videoPlayer.play({ playerId: 'fullscreen' });
        console.log(`play ${play}`);
        this.apiTimer2 = setTimeout(async () => {
          setMuted = await this.videoPlayer.setMuted({ playerId: 'fullscreen', muted: false });
          console.log('setMuted ', setMuted);
          const setVolume = await this.videoPlayer.setVolume({ playerId: 'fullscreen', volume: 0.5 });
          console.log(`setVolume ${setVolume}`);
          let volume = await this.videoPlayer.getVolume({ playerId: 'fullscreen' });
          console.log(`Volume ${volume}`);
          this.apiTimer3 = setTimeout(async () => {
            pause = await this.videoPlayer.pause({ playerId: 'fullscreen' });
            console.log('const pause ', pause);
            duration = await this.videoPlayer.getDuration({ playerId: 'fullscreen' });
            console.log(`duration ${duration}`);
            volume = await this.videoPlayer.setVolume({ playerId: 'fullscreen', volume: 1.0 });
            console.log(`Volume ${volume}`);
            setCurrentTime = await this.videoPlayer.setCurrentTime({ playerId: 'fullscreen', seektime: (duration.value - 3) });
            console.log(`setCurrentTime ${setCurrentTime}`);
            play = await this.videoPlayer.play({ playerId: 'fullscreen' });
            console.log(`play ${play}`);
          }, 10000);
        }, 8000);
      }, 7000);
    }
    return;
  }

  async leavePlayer(): Promise<void> {
    if (this.testApi) {
      // Clear the timer
      clearTimeout(this.apiTimer3);
      clearTimeout(this.apiTimer2);
      clearTimeout(this.apiTimer1);
    }
    await this.videoPlayer.stopAllPlayers();

    // Remove all the plugin listeners
    this.handlerPlay.remove();
    this.handlerPause.remove();
    this.handlerEnded.remove();
    this.handlerReady.remove();
    this.handlerExit.remove();
  }
}
