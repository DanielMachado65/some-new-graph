'use strict';

module.exports.PaginationHandler = class PaginationHandler {
    constructor(limit,offset,totalCount) {
        this.limit = limit;
        this.offset = offset;
        this.totalCount = totalCount;
    }

    builder(){
        return {
            setLimit(limit){
                this.limit = limit;
                return this;
            },
            setOffset(offset){
                this.offset = offset;
                return this;
            },
            totalCount(totalCount){
                this.totalCount = totalCount;
                return this;
            },
        }
    }
}

