
const symmetricRound = (x) => Math.round(Math.abs(x)) * Math.sign(x);

module.exports = {
    symmetricRound,
    default: symmetricRound
};
