const truncateString = (input, char_limit = 32, suffix = '...') => {
  if (input.length <= char_limit) {
      return input;
    }
    else {
      return input.substring(0, char_limit).trim() + suffix;
    }
}

export { truncateString }
