export function SortProcess(process) {
  process.sort((a, b) => {
    if (a.timexh > b.timexh) {
      return 1;
    } else if (a.timexh < b.timexh) {
      return -1;
    } else {
      return 0;
    }
  });
}
