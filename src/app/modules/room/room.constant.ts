export const roomFilterableFields:string[] = ['searchTerm','id','buildingId'];

export const roomsSearchablefields:string[] = ['roomNumber', 'floor'];

export const roomRelationalFields: string[] = ['buildingId'];

export const roomRelationalFieldsMapper: { [key: string]: string } = {
    buildingId: 'building'
};
