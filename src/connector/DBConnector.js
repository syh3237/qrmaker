import FirebaseConnector from './FirebaseConnector';

class DBConnector extends FirebaseConnector {

  async getCurrentUser(){
    return await super.getCurrentUser();
  }

  async getQRLists(){
    return await this.readData('/qrLists');
  }

  async getQRList(id){
    return await this.readData(`/qrLists/${id}`);
  }

  async setQRList(id, data){
    return await this.writeData(`/qrLists/${id}`, data);
  }

  async putQRList( data){
    return await this.writeDataWithPushKey(`/qrLists`, data);
  }

  async deleteQRList(id){
    return await this.deleteData(`/qrLists/${id}`);
  }

  async putUser(id, data){
    return await this.writeData(`/users/${id}`, data);
  }
}

export default DBConnector;