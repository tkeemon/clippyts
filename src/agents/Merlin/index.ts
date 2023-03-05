import { AgentWrapper } from '../../types';
import { agent } from './agent';
import { soundMp3 } from './sounds-mp3';
import { soundOgg } from './sounds-ogg';
import merlinImg from './map.png';

export const Merlin: AgentWrapper = {
    name: 'Merlin',
    image: merlinImg,
    config: agent,
    soundMp3,
    soundOgg,
}