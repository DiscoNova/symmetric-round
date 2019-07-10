
const symmetricRound = (x) => Math.round(Math.abs(x)) * (x < 0 ? -1 : 1);

module.exports = {
    symmetricRound,
    default: symmetricRound
};
