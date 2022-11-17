export function roll(sides = 6, dice = 2, rolls = 1) {  // Don't use 'export default function'
    var results = [];
    var i = 0;
    while (i < rolls) {
        results[i] = dice * (Math.floor(Math.random() * sides) + 1)
        i++;
    }

    var output = {
        sides: sides,
        dice: dice,
        rolls: rolls,
        results: results
    }

    return JSON.stringify(output);
}
