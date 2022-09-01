class MemoryContainer {
    constructor(){
        this.data = [];
        this.admin = true;
    };

    async getAll(){
        return this.data;
    };

    async save(newElement){
        if (this.admin) {
            this.data.push(newElement);
            return newElement;
        }else{
            return {error: "not allowed"};
        }
    };
};

export default MemoryContainer;