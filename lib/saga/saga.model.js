"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Saga {
    constructor(sagas) {
        this.sagas = sagas;
    }
    find(event) {
        for (let item of this.sagas) {
            const { entity, on, filter } = item;
            if (entity === event.entity &&
                on === event.type &&
                (!filter ||
                    !filter.column ||
                    (event.columns.indexOf(filter.column) !== -1 && !filter.value) ||
                    event.data[filter.column] === filter.value)) {
                return item;
            }
        }
        return null;
    }
}
exports.Saga = Saga;
//# sourceMappingURL=saga.model.js.map