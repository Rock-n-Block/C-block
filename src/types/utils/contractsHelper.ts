export type TDeployTokenContractCreationMethodNames =
  | 'deployERC20BurnableMintablePausableFreezableToken'
  | 'deployERC20MintablePausableFreezableToken'
  | 'deployERC20BurnableMintablePausableToken'
  | 'deployERC20MintablePausableToken'
  | 'deployERC20BurnablePausableFreezableToken'
  | 'deployERC20PausableFreezableToken'
  | 'deployERC20BurnablePausableToken'
  | 'deployERC20PausableToken';
export type TDeployCrowdsaleContractCreationMethodNames =
  | 'deployNonSoftCappableBonusableCrowdsale'
  | 'deployNonSoftCappableBonusableDatesChangeableCrowdsale'
  | 'deployNonSoftCappableCrowdsale'
  | 'deployNonSoftCappableDatesChangeableCrowdsale'
  | 'deploySoftCappableBonusableCrowdsale'
  | 'deploySoftCappableBonusableDatesChangeableCrowdsale'
  | 'deploySoftCappableCrowdsale'
  | 'deploySoftCappableDatesChangeableCrowdsale';
export type TDeployLostKeyContractCreationMethodNames = 'deployLostKey';
export type TDeployWillContractCreationMethodNames = 'deployLastWill';
export type TDeployWeddingContractCreationMethodNames = 'deployWedding';
export type TDeployContractCreationMethodNames =
  | TDeployTokenContractCreationMethodNames
  | TDeployCrowdsaleContractCreationMethodNames
  | TDeployLostKeyContractCreationMethodNames
  | TDeployWillContractCreationMethodNames
  | TDeployWeddingContractCreationMethodNames;

export type FactoryContracts = 'Tokens' | 'Crowdsales' | 'Lost Key' | 'Last Will' | 'Wedding';
