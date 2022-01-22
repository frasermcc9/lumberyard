import { performance } from "perf_hooks";
import { LogLevel } from "../settings/declarations";
import { LOG } from "./Log";

interface BenchSettings {
  logModule?: string;
  level?: LogLevel;
  waitAsync?: boolean;
}

export function Bench(settings?: BenchSettings) {
  return function (
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ) {
    const mod = settings?.logModule ?? target.constructor.name;
    const waitAsync = settings?.waitAsync ?? true;
    const level = settings?.level ?? "INFO";

    const method = propertyDescriptor.value;
    propertyDescriptor.value = async function (...args: any[]) {
      const start = performance.now();

      let result: any;
      if (waitAsync) {
        result = await method.apply(this, args);
      } else {
        result = method.apply(this, args);
      }

      const end = performance.now();
      const time = (end - start).toPrecision(4);

      LOG(mod, level, `${propertyName}(args) => result in ${time} ms.`);

      return result;
    };
  };
}
