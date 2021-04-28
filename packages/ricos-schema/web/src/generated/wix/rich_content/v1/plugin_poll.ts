/* eslint-disable */
export interface PollData {
  config?: PollConfig;
  poll?: Poll;
  layout?: PollWidgetLayout;
  design?: PollWidgetDesign;
  siteToken?: string;
}

export interface PollConfig {
  enableVoteRole?: boolean;
}

export interface PollOption {
  anonymousCount?: number;
  count?: number;
  id?: string;
  latestVoters: string[];
  mediaId?: string;
  rating?: number;
  title?: string;
}

export interface PollSettings {
  multipleVotes?: boolean;
  resultsVisibility: PollSettings_ResultsVisibility;
  voteRole: PollSettings_VoteRole;
  votersDisplay?: boolean;
  votesDisplay?: boolean;
}

export const enum PollSettings_ResultsVisibility {
  ALWAYS = 'ALWAYS',
  VOTERS_ONLY = 'VOTERS_ONLY',
  ONLY_ME = 'ONLY_ME',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function pollSettings_ResultsVisibilityFromJSON(
  object: any
): PollSettings_ResultsVisibility {
  switch (object) {
    case 0:
    case 'ALWAYS':
      return PollSettings_ResultsVisibility.ALWAYS;
    case 1:
    case 'VOTERS_ONLY':
      return PollSettings_ResultsVisibility.VOTERS_ONLY;
    case 2:
    case 'ONLY_ME':
      return PollSettings_ResultsVisibility.ONLY_ME;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollSettings_ResultsVisibility.UNRECOGNIZED;
  }
}

export function pollSettings_ResultsVisibilityToJSON(
  object: PollSettings_ResultsVisibility
): string {
  switch (object) {
    case PollSettings_ResultsVisibility.ALWAYS:
      return 'ALWAYS';
    case PollSettings_ResultsVisibility.VOTERS_ONLY:
      return 'VOTERS_ONLY';
    case PollSettings_ResultsVisibility.ONLY_ME:
      return 'ONLY_ME';
    default:
      return 'UNKNOWN';
  }
}

export const enum PollSettings_VoteRole {
  ALL = 'ALL',
  SITE_MEMBERS = 'SITE_MEMBERS',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function pollSettings_VoteRoleFromJSON(object: any): PollSettings_VoteRole {
  switch (object) {
    case 0:
    case 'ALL':
      return PollSettings_VoteRole.ALL;
    case 1:
    case 'SITE_MEMBERS':
      return PollSettings_VoteRole.SITE_MEMBERS;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollSettings_VoteRole.UNRECOGNIZED;
  }
}

export function pollSettings_VoteRoleToJSON(object: PollSettings_VoteRole): string {
  switch (object) {
    case PollSettings_VoteRole.ALL:
      return 'ALL';
    case PollSettings_VoteRole.SITE_MEMBERS:
      return 'SITE_MEMBERS';
    default:
      return 'UNKNOWN';
  }
}

export interface PollWidgetLayout {
  poll?: PollWidgetLayout_PollLayout;
  option?: PollWidgetLayout_PollOptionLayout;
}

export interface PollWidgetLayout_PollLayout {
  type: PollWidgetLayout_PollLayout_LayoutType;
  direction: PollWidgetLayout_PollLayout_Direction;
  enableImage?: boolean;
}

export const enum PollWidgetLayout_PollLayout_LayoutType {
  LIST = 'LIST',
  GRID = 'GRID',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function pollWidgetLayout_PollLayout_LayoutTypeFromJSON(
  object: any
): PollWidgetLayout_PollLayout_LayoutType {
  switch (object) {
    case 0:
    case 'LIST':
      return PollWidgetLayout_PollLayout_LayoutType.LIST;
    case 1:
    case 'GRID':
      return PollWidgetLayout_PollLayout_LayoutType.GRID;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollWidgetLayout_PollLayout_LayoutType.UNRECOGNIZED;
  }
}

export function pollWidgetLayout_PollLayout_LayoutTypeToJSON(
  object: PollWidgetLayout_PollLayout_LayoutType
): string {
  switch (object) {
    case PollWidgetLayout_PollLayout_LayoutType.LIST:
      return 'LIST';
    case PollWidgetLayout_PollLayout_LayoutType.GRID:
      return 'GRID';
    default:
      return 'UNKNOWN';
  }
}

export const enum PollWidgetLayout_PollLayout_Direction {
  LTR = 'LTR',
  RTL = 'RTL',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function pollWidgetLayout_PollLayout_DirectionFromJSON(
  object: any
): PollWidgetLayout_PollLayout_Direction {
  switch (object) {
    case 0:
    case 'LTR':
      return PollWidgetLayout_PollLayout_Direction.LTR;
    case 1:
    case 'RTL':
      return PollWidgetLayout_PollLayout_Direction.RTL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollWidgetLayout_PollLayout_Direction.UNRECOGNIZED;
  }
}

export function pollWidgetLayout_PollLayout_DirectionToJSON(
  object: PollWidgetLayout_PollLayout_Direction
): string {
  switch (object) {
    case PollWidgetLayout_PollLayout_Direction.LTR:
      return 'LTR';
    case PollWidgetLayout_PollLayout_Direction.RTL:
      return 'RTL';
    default:
      return 'UNKNOWN';
  }
}

export interface PollWidgetLayout_PollOptionLayout {
  enableImage?: boolean;
}

export interface Poll {
  anonymousCount?: number;
  count?: number;
  createdBy?: string;
  creatorFlag?: boolean;
  id?: string;
  mediaId?: string;
  options: PollOption[];
  /** poll_option_id */
  ownVotes: string[];
  title?: string;
  settings?: PollSettings;
}

export interface PollWidgetDesign {
  poll?: PollWidgetDesign_PollDesign;
  option?: PollWidgetDesign_PollOptionDesign;
}

export interface PollWidgetDesign_PollDesign {
  backgroundType: PollWidgetDesign_PollDesign_BackgroundType;
  background?: string;
  borderRadius?: number;
}

export const enum PollWidgetDesign_PollDesign_BackgroundType {
  COLOR = 'COLOR',
  IMAGE = 'IMAGE',
  GRADIENT = 'GRADIENT',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function pollWidgetDesign_PollDesign_BackgroundTypeFromJSON(
  object: any
): PollWidgetDesign_PollDesign_BackgroundType {
  switch (object) {
    case 0:
    case 'COLOR':
      return PollWidgetDesign_PollDesign_BackgroundType.COLOR;
    case 1:
    case 'IMAGE':
      return PollWidgetDesign_PollDesign_BackgroundType.IMAGE;
    case 2:
    case 'GRADIENT':
      return PollWidgetDesign_PollDesign_BackgroundType.GRADIENT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollWidgetDesign_PollDesign_BackgroundType.UNRECOGNIZED;
  }
}

export function pollWidgetDesign_PollDesign_BackgroundTypeToJSON(
  object: PollWidgetDesign_PollDesign_BackgroundType
): string {
  switch (object) {
    case PollWidgetDesign_PollDesign_BackgroundType.COLOR:
      return 'COLOR';
    case PollWidgetDesign_PollDesign_BackgroundType.IMAGE:
      return 'IMAGE';
    case PollWidgetDesign_PollDesign_BackgroundType.GRADIENT:
      return 'GRADIENT';
    default:
      return 'UNKNOWN';
  }
}

export interface PollWidgetDesign_PollOptionDesign {
  borderRadius?: number;
}

const basePollData: object = {};

export const PollData = {
  fromJSON(object: any): PollData {
    const message = { ...basePollData } as PollData;
    if (object.config !== undefined && object.config !== null) {
      message.config = PollConfig.fromJSON(object.config);
    } else {
      message.config = undefined;
    }
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = Poll.fromJSON(object.poll);
    } else {
      message.poll = undefined;
    }
    if (object.layout !== undefined && object.layout !== null) {
      message.layout = PollWidgetLayout.fromJSON(object.layout);
    } else {
      message.layout = undefined;
    }
    if (object.design !== undefined && object.design !== null) {
      message.design = PollWidgetDesign.fromJSON(object.design);
    } else {
      message.design = undefined;
    }
    if (object.siteToken !== undefined && object.siteToken !== null) {
      message.siteToken = String(object.siteToken);
    } else {
      message.siteToken = undefined;
    }
    return message;
  },

  toJSON(message: PollData): unknown {
    const obj: any = {};
    message.config !== undefined &&
      (obj.config = message.config ? PollConfig.toJSON(message.config) : undefined);
    message.poll !== undefined && (obj.poll = message.poll ? Poll.toJSON(message.poll) : undefined);
    message.layout !== undefined &&
      (obj.layout = message.layout ? PollWidgetLayout.toJSON(message.layout) : undefined);
    message.design !== undefined &&
      (obj.design = message.design ? PollWidgetDesign.toJSON(message.design) : undefined);
    message.siteToken !== undefined && (obj.siteToken = message.siteToken);
    return obj;
  },
};

const basePollConfig: object = {};

export const PollConfig = {
  fromJSON(object: any): PollConfig {
    const message = { ...basePollConfig } as PollConfig;
    if (object.enableVoteRole !== undefined && object.enableVoteRole !== null) {
      message.enableVoteRole = Boolean(object.enableVoteRole);
    } else {
      message.enableVoteRole = undefined;
    }
    return message;
  },

  toJSON(message: PollConfig): unknown {
    const obj: any = {};
    message.enableVoteRole !== undefined && (obj.enableVoteRole = message.enableVoteRole);
    return obj;
  },
};

const basePollOption: object = {};

export const PollOption = {
  fromJSON(object: any): PollOption {
    const message = { ...basePollOption } as PollOption;
    message.latestVoters = [];
    if (object.anonymousCount !== undefined && object.anonymousCount !== null) {
      message.anonymousCount = Number(object.anonymousCount);
    } else {
      message.anonymousCount = undefined;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Number(object.count);
    } else {
      message.count = undefined;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    if (object.latestVoters !== undefined && object.latestVoters !== null) {
      for (const e of object.latestVoters) {
        message.latestVoters.push(String(e));
      }
    }
    if (object.mediaId !== undefined && object.mediaId !== null) {
      message.mediaId = String(object.mediaId);
    } else {
      message.mediaId = undefined;
    }
    if (object.rating !== undefined && object.rating !== null) {
      message.rating = Number(object.rating);
    } else {
      message.rating = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    return message;
  },

  toJSON(message: PollOption): unknown {
    const obj: any = {};
    message.anonymousCount !== undefined && (obj.anonymousCount = message.anonymousCount);
    message.count !== undefined && (obj.count = message.count);
    message.id !== undefined && (obj.id = message.id);
    if (message.latestVoters) {
      obj.latestVoters = message.latestVoters.map(e => e);
    } else {
      obj.latestVoters = [];
    }
    message.mediaId !== undefined && (obj.mediaId = message.mediaId);
    message.rating !== undefined && (obj.rating = message.rating);
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },
};

const basePollSettings: object = {
  resultsVisibility: PollSettings_ResultsVisibility.ALWAYS,
  voteRole: PollSettings_VoteRole.ALL,
};

export const PollSettings = {
  fromJSON(object: any): PollSettings {
    const message = { ...basePollSettings } as PollSettings;
    if (object.multipleVotes !== undefined && object.multipleVotes !== null) {
      message.multipleVotes = Boolean(object.multipleVotes);
    } else {
      message.multipleVotes = undefined;
    }
    if (object.resultsVisibility !== undefined && object.resultsVisibility !== null) {
      message.resultsVisibility = pollSettings_ResultsVisibilityFromJSON(object.resultsVisibility);
    } else {
      message.resultsVisibility = PollSettings_ResultsVisibility.ALWAYS;
    }
    if (object.voteRole !== undefined && object.voteRole !== null) {
      message.voteRole = pollSettings_VoteRoleFromJSON(object.voteRole);
    } else {
      message.voteRole = PollSettings_VoteRole.ALL;
    }
    if (object.votersDisplay !== undefined && object.votersDisplay !== null) {
      message.votersDisplay = Boolean(object.votersDisplay);
    } else {
      message.votersDisplay = undefined;
    }
    if (object.votesDisplay !== undefined && object.votesDisplay !== null) {
      message.votesDisplay = Boolean(object.votesDisplay);
    } else {
      message.votesDisplay = undefined;
    }
    return message;
  },

  toJSON(message: PollSettings): unknown {
    const obj: any = {};
    message.multipleVotes !== undefined && (obj.multipleVotes = message.multipleVotes);
    message.resultsVisibility !== undefined &&
      (obj.resultsVisibility = pollSettings_ResultsVisibilityToJSON(message.resultsVisibility));
    message.voteRole !== undefined &&
      (obj.voteRole = pollSettings_VoteRoleToJSON(message.voteRole));
    message.votersDisplay !== undefined && (obj.votersDisplay = message.votersDisplay);
    message.votesDisplay !== undefined && (obj.votesDisplay = message.votesDisplay);
    return obj;
  },
};

const basePollWidgetLayout: object = {};

export const PollWidgetLayout = {
  fromJSON(object: any): PollWidgetLayout {
    const message = { ...basePollWidgetLayout } as PollWidgetLayout;
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = PollWidgetLayout_PollLayout.fromJSON(object.poll);
    } else {
      message.poll = undefined;
    }
    if (object.option !== undefined && object.option !== null) {
      message.option = PollWidgetLayout_PollOptionLayout.fromJSON(object.option);
    } else {
      message.option = undefined;
    }
    return message;
  },

  toJSON(message: PollWidgetLayout): unknown {
    const obj: any = {};
    message.poll !== undefined &&
      (obj.poll = message.poll ? PollWidgetLayout_PollLayout.toJSON(message.poll) : undefined);
    message.option !== undefined &&
      (obj.option = message.option
        ? PollWidgetLayout_PollOptionLayout.toJSON(message.option)
        : undefined);
    return obj;
  },
};

const basePollWidgetLayout_PollLayout: object = {
  type: PollWidgetLayout_PollLayout_LayoutType.LIST,
  direction: PollWidgetLayout_PollLayout_Direction.LTR,
};

export const PollWidgetLayout_PollLayout = {
  fromJSON(object: any): PollWidgetLayout_PollLayout {
    const message = { ...basePollWidgetLayout_PollLayout } as PollWidgetLayout_PollLayout;
    if (object.type !== undefined && object.type !== null) {
      message.type = pollWidgetLayout_PollLayout_LayoutTypeFromJSON(object.type);
    } else {
      message.type = PollWidgetLayout_PollLayout_LayoutType.LIST;
    }
    if (object.direction !== undefined && object.direction !== null) {
      message.direction = pollWidgetLayout_PollLayout_DirectionFromJSON(object.direction);
    } else {
      message.direction = PollWidgetLayout_PollLayout_Direction.LTR;
    }
    if (object.enableImage !== undefined && object.enableImage !== null) {
      message.enableImage = Boolean(object.enableImage);
    } else {
      message.enableImage = undefined;
    }
    return message;
  },

  toJSON(message: PollWidgetLayout_PollLayout): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = pollWidgetLayout_PollLayout_LayoutTypeToJSON(message.type));
    message.direction !== undefined &&
      (obj.direction = pollWidgetLayout_PollLayout_DirectionToJSON(message.direction));
    message.enableImage !== undefined && (obj.enableImage = message.enableImage);
    return obj;
  },
};

const basePollWidgetLayout_PollOptionLayout: object = {};

export const PollWidgetLayout_PollOptionLayout = {
  fromJSON(object: any): PollWidgetLayout_PollOptionLayout {
    const message = {
      ...basePollWidgetLayout_PollOptionLayout,
    } as PollWidgetLayout_PollOptionLayout;
    if (object.enableImage !== undefined && object.enableImage !== null) {
      message.enableImage = Boolean(object.enableImage);
    } else {
      message.enableImage = undefined;
    }
    return message;
  },

  toJSON(message: PollWidgetLayout_PollOptionLayout): unknown {
    const obj: any = {};
    message.enableImage !== undefined && (obj.enableImage = message.enableImage);
    return obj;
  },
};

const basePoll: object = {};

export const Poll = {
  fromJSON(object: any): Poll {
    const message = { ...basePoll } as Poll;
    message.options = [];
    message.ownVotes = [];
    if (object.anonymousCount !== undefined && object.anonymousCount !== null) {
      message.anonymousCount = Number(object.anonymousCount);
    } else {
      message.anonymousCount = undefined;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Number(object.count);
    } else {
      message.count = undefined;
    }
    if (object.createdBy !== undefined && object.createdBy !== null) {
      message.createdBy = String(object.createdBy);
    } else {
      message.createdBy = undefined;
    }
    if (object.creatorFlag !== undefined && object.creatorFlag !== null) {
      message.creatorFlag = Boolean(object.creatorFlag);
    } else {
      message.creatorFlag = undefined;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    if (object.mediaId !== undefined && object.mediaId !== null) {
      message.mediaId = String(object.mediaId);
    } else {
      message.mediaId = undefined;
    }
    if (object.options !== undefined && object.options !== null) {
      for (const e of object.options) {
        message.options.push(PollOption.fromJSON(e));
      }
    }
    if (object.ownVotes !== undefined && object.ownVotes !== null) {
      for (const e of object.ownVotes) {
        message.ownVotes.push(String(e));
      }
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.settings !== undefined && object.settings !== null) {
      message.settings = PollSettings.fromJSON(object.settings);
    } else {
      message.settings = undefined;
    }
    return message;
  },

  toJSON(message: Poll): unknown {
    const obj: any = {};
    message.anonymousCount !== undefined && (obj.anonymousCount = message.anonymousCount);
    message.count !== undefined && (obj.count = message.count);
    message.createdBy !== undefined && (obj.createdBy = message.createdBy);
    message.creatorFlag !== undefined && (obj.creatorFlag = message.creatorFlag);
    message.id !== undefined && (obj.id = message.id);
    message.mediaId !== undefined && (obj.mediaId = message.mediaId);
    if (message.options) {
      obj.options = message.options.map(e => (e ? PollOption.toJSON(e) : undefined));
    } else {
      obj.options = [];
    }
    if (message.ownVotes) {
      obj.ownVotes = message.ownVotes.map(e => e);
    } else {
      obj.ownVotes = [];
    }
    message.title !== undefined && (obj.title = message.title);
    message.settings !== undefined &&
      (obj.settings = message.settings ? PollSettings.toJSON(message.settings) : undefined);
    return obj;
  },
};

const basePollWidgetDesign: object = {};

export const PollWidgetDesign = {
  fromJSON(object: any): PollWidgetDesign {
    const message = { ...basePollWidgetDesign } as PollWidgetDesign;
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = PollWidgetDesign_PollDesign.fromJSON(object.poll);
    } else {
      message.poll = undefined;
    }
    if (object.option !== undefined && object.option !== null) {
      message.option = PollWidgetDesign_PollOptionDesign.fromJSON(object.option);
    } else {
      message.option = undefined;
    }
    return message;
  },

  toJSON(message: PollWidgetDesign): unknown {
    const obj: any = {};
    message.poll !== undefined &&
      (obj.poll = message.poll ? PollWidgetDesign_PollDesign.toJSON(message.poll) : undefined);
    message.option !== undefined &&
      (obj.option = message.option
        ? PollWidgetDesign_PollOptionDesign.toJSON(message.option)
        : undefined);
    return obj;
  },
};

const basePollWidgetDesign_PollDesign: object = {
  backgroundType: PollWidgetDesign_PollDesign_BackgroundType.COLOR,
};

export const PollWidgetDesign_PollDesign = {
  fromJSON(object: any): PollWidgetDesign_PollDesign {
    const message = { ...basePollWidgetDesign_PollDesign } as PollWidgetDesign_PollDesign;
    if (object.backgroundType !== undefined && object.backgroundType !== null) {
      message.backgroundType = pollWidgetDesign_PollDesign_BackgroundTypeFromJSON(
        object.backgroundType
      );
    } else {
      message.backgroundType = PollWidgetDesign_PollDesign_BackgroundType.COLOR;
    }
    if (object.background !== undefined && object.background !== null) {
      message.background = String(object.background);
    } else {
      message.background = undefined;
    }
    if (object.borderRadius !== undefined && object.borderRadius !== null) {
      message.borderRadius = Number(object.borderRadius);
    } else {
      message.borderRadius = undefined;
    }
    return message;
  },

  toJSON(message: PollWidgetDesign_PollDesign): unknown {
    const obj: any = {};
    message.backgroundType !== undefined &&
      (obj.backgroundType = pollWidgetDesign_PollDesign_BackgroundTypeToJSON(
        message.backgroundType
      ));
    message.background !== undefined && (obj.background = message.background);
    message.borderRadius !== undefined && (obj.borderRadius = message.borderRadius);
    return obj;
  },
};

const basePollWidgetDesign_PollOptionDesign: object = {};

export const PollWidgetDesign_PollOptionDesign = {
  fromJSON(object: any): PollWidgetDesign_PollOptionDesign {
    const message = {
      ...basePollWidgetDesign_PollOptionDesign,
    } as PollWidgetDesign_PollOptionDesign;
    if (object.borderRadius !== undefined && object.borderRadius !== null) {
      message.borderRadius = Number(object.borderRadius);
    } else {
      message.borderRadius = undefined;
    }
    return message;
  },

  toJSON(message: PollWidgetDesign_PollOptionDesign): unknown {
    const obj: any = {};
    message.borderRadius !== undefined && (obj.borderRadius = message.borderRadius);
    return obj;
  },
};
