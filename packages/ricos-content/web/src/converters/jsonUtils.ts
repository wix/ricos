/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichContent } from 'ricos-schema';

export const fromJSONLight = (object: Record<string, any>): RichContent => {
  const { version, createdTimestamp, updatedTimestamp } = object.metadata || {};
  const content: RichContent = {
    nodes: object.nodes,
    metadata: {
      version,
      createdTimestamp: fromJsonTimestamp(createdTimestamp),
      updatedTimestamp: fromJsonTimestamp(updatedTimestamp),
    },
  };
  return content;
};

export const toJSONLight = (content: RichContent): Record<string, any> => {
  const { version, createdTimestamp, updatedTimestamp } = content.metadata || {};
  const object = {
    nodes: content.nodes,
    metadata: {
      version,
      createdTimestamp: createdTimestamp?.toISOString(),
      updatedTimestamp: updatedTimestamp?.toISOString(),
    },
  };
  return object;
};

/**
 * Taken from Timestamp implementation in ricos-schema
 */

export interface Timestamp {
  /**
   * Represents seconds of UTC time since Unix epoch
   * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   * 9999-12-31T23:59:59Z inclusive.
   */
  seconds: number;
  /**
   * Non-negative fractions of a second at nanosecond resolution. Negative
   * second values with fractions must still have non-negative nanos values
   * that count forward in time. Must be from 0 to 999,999,999
   * inclusive.
   */
  nanos: number;
}

const baseTimestamp: Timestamp = { seconds: 0, nanos: 0 };

const Timestamp = {
  fromJSON(object: any): Timestamp {
    const message = { ...baseTimestamp } as Timestamp;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = Number(object.seconds);
    } else {
      message.seconds = 0;
    }
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = Number(object.nanos);
    } else {
      message.nanos = 0;
    }
    return message;
  },

  toJSON(message: Timestamp): unknown {
    const obj: any = {};
    message.seconds !== undefined && (obj.seconds = message.seconds);
    message.nanos !== undefined && (obj.nanos = message.nanos);
    return obj;
  },
};

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
