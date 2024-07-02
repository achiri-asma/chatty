<template>
  <div
    class="flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto px-4 py-4 rtl h-screen  lg:mt-[0px] -mt-4 overflow-hidden ">
    <!-- Contacts List -->
    <div class="w-full lg:w-[400px] mb-8 mt-6 lg:margin-end lg:ml-4 lg:mb-0" v-show="showContactList || !isMobile">
      <div class="bg-customGreen h-[80px] flex items-center rounded-t-xl p-4">
        <div class="flex items-center w-full bg-bg rounded-md h-[40px] px-3">
          <img class="w-5 h-5 rtl-flip" src="../assets/search.png" alt="search" />
          <input type="search" v-model="searchQuery"
            class="w-full h-full bg-transparent text-direction placeholder-white px-2 focus:outline-none"
            placeholder="بحث بالاسم او رقم الجوال" />
        </div>
      </div>
      <div class="h-[600px] rounded-b-xl border-2 border-t-0 border-customGreen">
        <div class="flex justify-start text-direction">
          <div class="w-[80px] h-[40px] cursor-pointer padding-start flex items-center justify-start"
            :class="{ 'bg-bluee text-white': activeTab === 'الكل', 'text-gray-500': activeTab !== 'الكل' }"
            @click="switchTab('الكل')">
            الكل
          </div>
          <div class="w-[100px] h-[40px] cursor-pointer padding-start flex items-center justify-start"
            :class="{ 'bg-bluee text-white': activeTab === 'محادثاتي', 'text-gray-500': activeTab !== 'محادثاتي' }"
            @click="switchTab('محادثاتي')">
            محادثاتي
          </div>
        </div>
        <div class="border-t-2 border-gray overflow-y-auto h-[500px] scrollbar-thin">
          <ul>
            <li v-for="contact in filteredContacts" :key="contact.id" @click="selectContact(contact)">
              <div class="flex flex-row-direction items-start border-b-2 border-gray-200 p-4 cursor-pointer">
                <div class="flex flex-col items-direction-start flex-grow">
                  <p class="text-[17px] text-gray-500 font-semibold">{{ contact.name }}</p>
                  <p class="text-[13px] text-gray-500 font-semibold mt-1" dir="ltr">{{ contact.time }}</p>
                  <p class="text-[15px] text-gray-400">{{ contact.lastMessage }}</p>
                </div>
                <div
                  class="w-[70px] h-[70px] rounded-full bg-gray-100 border-gray-00 border-2 flex items-center justify-center margin-start ml-4">
                  <p class="text-2xl text-gray-400"><img :src="contact.icon" alt="user"
                      class="w-[70px] h-[70px] rounded-full"></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="bottom-0 left-0 w-full rounded-b-lg bg-customGreen border-t-2 bg-white text-gray-400 p-4 h-[50px] flex items-center mt-2">
          <img src="../assets/archive.png" alt="archive" class="w-6 h-6 ">
          <p class="mr-5">المحادثات المؤرشفة</p>
        </div>
      </div>
    </div>
    <!-- Chat Section -->
    <div class="w-full lg:w-[1000px] mt-6 lg:margin-start lg:mr-4" v-show="(!showContactList && isMobile) || !isMobile">
      <!-- Back button for mobile -->

      <div v-if="selectedContact" class="bg-customGreen h-[80px] flex items-center justify-between rounded-t-xl p-4">
        <div class="flex items-center">
          <img :src="selectedContact.icon" alt="profil" class="w-[50px] h-[50px] rounded-full">
          <div class="text-direction margin-start text-white ">
            <p class="font-semibold text-[18px]">{{ selectedContact.name }}</p>
            <p class="text-sm text-[15px]" dir="ltr">+213111111111</p>
          </div>
          <div
            class="flex flex-row-reverse -space-x-1 rtl:space-x-reverse rtl:-space-x-1 sm:-space-x-2 md:-space-x-2 lg:-space-x-2 xl:-space-x-2 2xl:-space-x-2 mr-2 sm:mr-4 md:mr-6 lg:mr-[200px] xl:mr-[300px] 2xl:mr-[400px]">
            <div v-for="(participant, index) in participants" :key="index"
              class="relative inline-block bg-yellow-50 border-2 border-yellow-200 rounded-full overflow-hidden h-8 w-8 sm:h-10 sm:w-10 hover:z-10 hover:bg-yellow-500">
              <div class="h-full rounded-full flex items-center justify-center">
                <p class="text-[14px] sm:text-[16px] text-yellow-400 hover:text-white" :title="participant.name">
                  {{ participant.initial }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <img v-if="isMobile" class="w-[27px] h-[27px] cursor-pointer mr-2" src="../assets/contact.png" alt="c"
            @click="showContactList = true" />
          <img class="w-[27px] h-[27px] cursor-pointer rtl-flip" src="../assets/list.png" alt="list"
            @click="toggleList" />
        </div>

        <ul v-if="showList" class="absolute bg-white border rounded mt-[350px] p-2 w-[180px]" style="left: 12px;">
          <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
            <span class="flex items-center mb-4 hover:bg-green-100">
              <img class="w-6 h-6 mt-2  ml-4 mr-4" :src="option.icon" alt="icon">
              <p class="text-gray-600">{{ option.name }}</p>
            </span>
          </li>
        </ul>
      </div>

      <div class="h-[600px] rounded-b-xl border-2 border-t-0 border-customGreen">
        <div class="custom-bg bg-white flex flex-col space-y-4 overflow-y-auto h-[550px] p-4">
          <div class="message-sent bg-bg text-white p-3 rounded-lg max-w-xs self-start">
            <p>هذا هو نص الرسالة المرسلة</p>
            <span class="text-xs text-white mt-1 text-right" dir="ltr">{{ '10:15 PM' }}</span>
          </div>
          <div class="message-received bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs self-end">
            <p>هذا هو نص الرسالة المستلمة</p>
            <span class="text-xs text-gray-800 mt-1 text-right" dir="ltr">{{ '10:17 PM' }}</span>
          </div>
          <div class="message-center bg-yellow-200 text-gray-800 p-3 rounded-lg self-center text-center max-w-[480px]">
            <p>بدأ شركة وثقى للاستشارات القانونية المحادثة يوم الثلاثاء 04يونيو 2024 الساعة 05:42 م</p>
          </div>
        </div>
        <div class="bg-white h-[48px] rounded-b-xl flex items-center justify-between px-4">
          <p dir="ltr" class="text-gray-400 text-right" v-if="isVisible">template مضى على اخر رسالة 24 ساعة يمكنك فقط
            ارسال</p>
          <img class="w-[27px] h-[27px] cursor-pointer rtl-flip" src="../assets/select.png" alt="select"
            @click="toggleDropdown" v-if="isVisible" />
          <div v-if="showDropdown" class="absolute bg-white border rounded -mt-[350px] w-[350px] h-[320px] p-4 z-10"
            style="left: 12px;">
            <input type="text" v-model="searchQuery1" placeholder="ابحث عن رد/قالب جاهز"
              class="w-full p-2 border rounded mb-2" />
            <div v-for="(item, index) in filteredItems" :key="index">
              <template v-if="index < 5">
                <div class="flex items-center p-2 hover:bg-green-100" @click="selectItem(item)">
                  <img class="w-6 h-6 mt-2 ml-4 mr-4" :src="item.icon" alt="icon">{{ item.name }}
                  <p class="mr-5 text-gray-400">{{ item.lettre }}</p>
                </div>
              </template>
            </div>
            <div v-if="filteredItems.length > 5" class="text-center text-gray-500 ">
            </div>
          </div>
          <div v-if="selectedItem" class="flex items-center w-full">
           
              <img src="../assets/attach-file.png" class="w-8 h-8 " alt="upload" @click="triggerFileUpload">
            
            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload">
            <input type="text" v-model="message" placeholder="اكتب الرسالة"
              class="flex-grow h-10 bg-transparent focus:outline-none px-2 sm:px-4 text-direction placeholder-gray-400 text-gray-400 sm:w-[700px] md:w-[750px] lg:w-[800px] xl:w-[800px]" />
            
              <img class="w-6 h-6 rtl-flip" src="../assets/chat.png" alt="send">
            
              <img src="../assets/happiness.png" class="w-6 h-6 " alt="emojis" @click="toggleEmojiPicker">
            <div v-if="showEmojiPicker"
              class="emoji-picker w-[350px] h-[300px] overflow-y-auto absolute bg-white border rounded -mt-[350px] "
              style="left:50px;">
              <EmojiPicker @emoji-select="addEmoji" class="[&_img]:w-10 [&_img]:h-10 [&_span]:text-xs" />
            </div>

            <img class="w-6 h-6 cursor-pointer rtl-flip" src="../assets/select.png" alt="select"
              @click="toggleDropdown" />
            <div v-if="showDropdown" class="absolute bg-white border rounded -mt-[350px] w-[350px] h-[320px] p-4 z-10"
              style="left: 12px;">
              <input type="text" v-model="searchQuery1" placeholder="ابحث عن رد/قالب جاهز"
                class="w-full p-2 border rounded mb-2" />
              <div v-for="(item, index) in filteredItems" :key="index">
                <template v-if="index < 5">
                  <div class="flex items-center p-2 hover:bg-green-100" @click="selectItem1(item)">
                    <img class="w-6 h-6 mt-2 ml-4 mr-4" :src="item.icon" alt="icon">{{ item.name }}
                    <p class="mr-5 text-gray-400">{{ item.lettre }}</p>
                  </div>
                </template>
              </div>
              <div v-if="filteredItems.length > 5" class="text-center text-gray-500">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmojiPicker from 'vue3-emoji-picker';

export default {
  components: {
    EmojiPicker,
  },
  data() {
    return {
      showEmojiPicker: false,
      isVisible: true,
      activeTab: 'الكل',
      searchQuery: '',
      message: '',
      selectedContact: null,
      isMobile: false,
      showContactList: true,
      selectedItem: null,
      contacts: [
        { id: 1, name: 'أم عمر', time: '09:15 PM', lastMessage: 'السلام عليكم', icon: require('../assets/mom.png') },
        { id: 2, name: 'rahmani djamel 2', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png') },
        { id: 3, name: 'Abdullah Imane', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/mom.png') },
        { id: 4, name: 'khaled', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png') },
        { id: 5, name: 'Lamine', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png') },
        { id: 6, name: 'Lamine', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png') },
        { id: 7, name: 'Lamine', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png') },
        { id: 8, name: 'Oum Lamiss', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/mom.png') },
      ],
      showList: false,
      options: [
        { name: 'تحويل لزميل', icon: require('../assets/go.png') },
        { name: 'دعوة زميل', icon: require('../assets/add-user.png') },
        { name: 'فتح تذكرة', icon: require('../assets/tickets.png') },
        { name: 'اضافة tags', icon: require('../assets/tag.png') },
        { name: 'تغيير القسم', icon: require('../assets/three-books.png') },
        { name: 'انهاء المحادثة', icon: require('../assets/x-mark.png') }
      ],
      participants: [
        { name: "شركة وثقى للاستشارات القانونية", initial: "ش" },
        { name: "Lamine", initial: "L" },

      ],
      showDropdown: false,
      searchQuery1: '',
      items: [
        { name: 'ترحيب', lettre: 'اهلا وسهلا بكم....', icon: require('../assets/whatsapp.png') },
        { name: 'ارسال خطاب', lettre: 'اهلا وسهلا بكم....', icon: require('../assets/whatsapp.png') },
        { name: 'ارسال خطاب', lettre: 'اهلا وسهلا بكم....', icon: require('../assets/whatsapp.png') },
        { name: 'رسالة ترحيبية', lettre: 'اهلا وسهلا بكم....', icon: require('../assets/whatsapp.png') },
        { name: 'new', lettre: 'اهلا وسهلا بكم....', icon: require('../assets/whatsapp.png') },
        { name: 'اهلا وسهلا', lettre: 'اهلا وسهلا بكم....', icon: require('../assets/whatsapp.png') },
        { name: 'اهلا وسهلا', lettre: 'اهلا وسهلا بكم....', icon: require('../assets/whatsapp.png') },
        { name: 'نبذة', lettre: 'اهلا وسهلا بكم....', icon: require('../assets/whatsapp.png') },
      ],
    };
  },
  computed: {
    filteredContacts() {
      if (this.searchQuery) {
        return this.contacts.filter(contact =>
          contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.contacts;
    },
    filteredItems() {
      return this.items.filter(item => item.name.toLowerCase().startsWith(this.searchQuery1.toLowerCase()));
    }
  },
  methods: {
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    addEmoji(emoji) {
      this.message += emoji;
    },
    selectItem(item) {
      this.selectedItem = item;
      this.hideDropdown();
      this.isVisible = !this.isVisible;
    },
    selectItem1(item) {
      this.selectedItem = item;
      this.hideDropdown();
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    hideDropdown() {
      this.showDropdown = false;
    },
    switchTab(tabName) {
      this.activeTab = tabName;
    },
    selectContact(contact) {
      this.selectedContact = contact;
      if (this.isMobile) {
        this.showContactList = false;
      }
    },
    backToContacts() {
      this.showContactList = true;
      this.selectedContact = null;
    },
    sendMessage() {
      if (this.message.trim() !== '') {
        console.log('Message sent:', this.message);
        this.message = '';
      }
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        console.log('File uploaded:', file.name);
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 1024;
      if (!this.isMobile) {
        this.showContactList = true;
      }
    },
    selectDefaultContact() {
      if (this.contacts.length > 0 && !this.isMobile) {
        this.selectContact(this.contacts[0]);
      }
    },
    toggleList() {
      this.showList = !this.showList;
    },
    selectOption(option) {
      console.log('Option sélectionnée:', option);
      this.showList = false;
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    this.selectDefaultContact();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  }
};
</script>

<style scoped>
.rtl {
  direction: rtl;
}

.text-direction {
  text-align: right;
}

.flex-row-direction {
  flex-direction: row-reverse;
}

.items-direction-start {
  align-items: flex-start;
}

.margin-start {
  margin-right: 1rem;
}

.margin-start-large {
  margin-right: 2rem;
}

.margin-end {
  margin-left: 1rem;
}

.padding-start {
  padding-right: 1rem;
}

.rtl-flip {
  transform: scaleX(-1);
}

.custom-bg {
  background-image: url('../assets/background.jpeg');
  background-repeat: repeat;
  background-size: contain;
}

.bg-customGreen {
  background-color: #128C7E;
}

.bg-bluee {
  background-color: #34B7F1;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #555;
}



@media (max-width: 1023px) {

  .contact-list,
  .chat-section {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
  }
}


@media (max-width: 640px) {
  .mobile-height {
    height: calc(100vh - 100px);
  }
}
</style>