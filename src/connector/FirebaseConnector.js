import { getDatabase, ref, set, get, child, update, remove, push } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app} from '../firebase';

class FirebaseConnector {
  constructor() {
    this.db = getDatabase(app);
    this.auth = getAuth(app);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      }, (error) => {
        reject(error);
      });
    });
  }

  // 데이터 쓰기
  async writeData(path, data) {
    try {
      await set(ref(this.db, path), data);
      console.log("Data written successfully");
    } catch (e) {
      console.error("Error writing data: ", e);
      throw e;
    }
  }

  // 데이터 읽기
  async readData(path) {
    try {
      const dbRef = ref(this.db);
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    } catch (e) {
      console.error("Error reading data: ", e);
      throw e;
    }
  }

   // 데이터 업데이트
   async updateData(path, data) {
    try {
      await update(ref(this.db, path), data);
      console.log("Data updated successfully");
    } catch (e) {
      console.error("Error updating data: ", e);
      throw e;
    }
  }

    // 데이터 삭제
    async deleteData(path) {
      try {
        await remove(ref(this.db, path));
        console.log("Data deleted successfully");
      } catch (e) {
        console.error("Error deleting data: ", e);
        throw e;
      }
    }
    
    // 푸시 키를 사용하여 데이터 쓰기
    async writeDataWithPushKey(path, data) {
      try {
        const newRef = push(ref(this.db, path));
        await set(newRef, data);
        console.log("Data written with push key successfully");
        return newRef.key; // 생성된 푸시 키 반환
      } catch (e) {
        console.error("Error writing data with push key: ", e);
        throw e;
      }
    }

    async writeUserName() {
      try {
        const user = await this.getCurrentUser();
        if (user) {
          await this.writeData(`/users/${user.uid}`, { displayName: user.displayName });
          console.log("User name written successfully");
        } else {
          console.log("No user is currently logged in");
        }
      } catch (e) {
        console.error("Error writing user name: ", e);
        throw e;
      }
    }
}

export default FirebaseConnector;