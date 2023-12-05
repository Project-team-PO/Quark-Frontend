export const FormatDate = (date: Date) => {
  function pad(s: number) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(date);
  return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
};

