import { log, ethereum, Value } from '@graphprotocol/graph-ts';
import {
    Transfer
} from '../generated/LensHub/ERC20';
import {
    Account
} from '../generated/schema';
import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'


export function handleTransfer(event: Transfer): void {
    let fromAccount = Account.load(event.params.from.toHex());
    if (fromAccount == null) {
      fromAccount = new Account(event.params.from.toHex());
      fromAccount.balance = BigInt.fromI32(0);
    }
    fromAccount.balance = fromAccount.balance.minus(event.params.value);
    fromAccount.save();
  
    let toAccount = Account.load(event.params.to.toHex());
    if (toAccount == null) {
      toAccount = new Account(event.params.to.toHex());
      toAccount.balance = BigInt.fromI32(0);
    }
    toAccount.balance = toAccount.balance.plus(event.params.value);
    toAccount.save();
  }