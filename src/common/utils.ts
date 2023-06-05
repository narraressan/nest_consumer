import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const QUEUE_NAME = 'event_driven_demo';

export const cast = async <T>(
  clazz: ClassConstructor<T>,
  obj: object,
): Promise<T> => {
  try {
    const toClass = plainToClass(clazz, obj, {
      excludeExtraneousValues: false,
    });
    await validateOrReject(toClass as unknown as object);
    return toClass;
  } catch (error) {
    console.log(error);
    return null;
  }
};
