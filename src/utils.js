const truncateString = (input, charLimit = 32, suffix = '...') => {
  input = input.toString();
  if (input.length <= charLimit) {
      return input;
    }
    else {
      return input.substring(0, charLimit).trim() + suffix;
    }
}

export { truncateString }
