import { AgentWrapper } from '../../types';
import { agent } from './agent';
import { soundMp3 } from './sounds-mp3';
import { soundOgg } from './sounds-ogg';
import ottoImg from './map.png';

const Otto: AgentWrapper = {
    name: 'Otto',
    image: ottoImg,
    config: agent,
    soundMp3,
    soundOgg,
}

export default Otto;
