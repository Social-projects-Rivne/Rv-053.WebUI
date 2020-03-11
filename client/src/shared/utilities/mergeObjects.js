export default function mergeObjects(...objs) {
  return objs.reduce((accumulator, obj) => ({ ...accumulator, obj }), {});
}
