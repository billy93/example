import { log } from '@graphprotocol/graph-ts';
import {
    Transfer
} from '../generated/LensHub/ERC20';
import {
    Test
} from '../generated/schema';

export function handleTransfer(event: Transfer): void {
  log.info('Event [Transfer] has been trigger', []);
}
