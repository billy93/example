import { log } from '@graphprotocol/graph-ts';
import {
    Transfer
} from '../generated/LensHub/ERC20';
import {
    Test
} from '../generated/schema';
import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  log.info('Event [Transfer] has been trigger Value: {} Tx: {}', [
    event.params.value.toString(),
    event.transaction.hash.toHex()]);
}
