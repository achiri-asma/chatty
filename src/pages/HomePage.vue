<template>
  <div
    class="flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto px-4 py-4 rtl h-screen  lg:mt-[0px] -mt-4 overflow-hidden"
    >
    <!-- Contacts List -->
    <div class="w-full lg:w-[400px] mb-8 mt-6  lg:margin-end lg:ml-4 lg:mb-0" v-show="showContactList || !isMobile">
      <div class="bg-customGreen h-[80px] flex items-center rounded-t-xl p-4">
        <div class="flex items-center w-full bg-transparent rounded-md h-[40px] px-3 relative search-container">
          <img class="w-5 h-5 rtl-flip cursor-pointer search-icon" src="../assets/search.png" alt="search" />
          <input type="search" v-model="searchQuery"
            class="search-input bg-white rounded-3xl text-direction placeholder-gray-500 px-4 focus:outline-none"
            placeholder="بحث ..." />
        </div>
      </div>

      <div class="h-[600px] rounded-b-xl border-2 border-t-0 border-customGreen">
        <div class="overflow-y-auto h-[540px] scrollbar-thin">
          <ul x-data="{ selectedId: null }">
            <li v-for="contact in filteredContacts" :key="contact.id"
              @click="selectedId = contact.id; selectContact(contact)"
              :class="{ 'bg-blue-100': selectedId === contact.id }">

              <div class="flex flex-row-direction items-start  p-4 cursor-pointer hover:bg-gray-100 ">
                <div class="flex items-center w-full">
                  <div class="flex-shrink-0 w-[70px] h-[70px]  ml-6 mr-2">
                    <img :src="contact.icon" alt="user" class="w-full h-full rounded-full object-cover">
                  </div>

                  <div class="flex flex-grow justify-between items-center">
                    <div class="flex flex-col">
                      <p class="text-[17px] text-gray-500 font-semibold">{{ contact.name }}</p>
                      <p class="text-[13px] text-gray-500 font-semibold mt-1" dir="ltr">{{ contact.time }}</p>
                      <p class="text-[15px] text-gray-400">{{ contact.lastMessage }}</p>
                    </div>

                    <div v-if="contact.unreadMessages > 0" class="flex-shrink-0 ">
                      <div
                        class="bg-redd text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {{ contact.unreadMessages }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom-0 left-0 w-full rounded-b-xl bg-gri  text-gr p-4 h-[50px] flex items-center mt-2">
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
          <img v-if="isMobile" class="w-[20px] h-[20px] cursor-pointer ml-2" src="../assets/right-arrow.png" alt="c"
            @click="showContactList = true" />
          <img :src="selectedContact.icon" alt="profil" class="w-[60px] h-[60px] rounded-full">
          <div class="text-direction margin-start text-white ">
            <p class="font-semibold text-[18px]">{{ selectedContact.name }}</p>
            <p class="text-sm text-[15px] mt-2" dir="ltr">+213111111111</p>
          </div>
          <div
            class="flex flex-row-reverse rtl:flex-row mr-2 sm:mr-4 md:mr-6 lg:mr-[200px] xl:mr-[300px] 2xl:mr-[400px]">
            <div v-for="(participant, index) in participants" :key="index" class="relative inline-block h-8 w-8 sm:h-10 sm:w-10 hover:z-10
           ml-1 sm:ml-2 md:ml-3 lg:ml-4 xl:ml-5 2xl:ml-6 first:ml-0">
              <div class="h-full w-full flex items-center justify-center overflow-hidden">
                <p class="text-[14px] sm:text-[16px] text-gray-400 truncate sm:text-clip sm:overflow-visible max-w-full px-1"
                  :title="participant.name">
                  {{ participant.name }}
                </p>
              </div>
            </div>

          </div>
        </div>
        <div class="flex items-center">
          <img class="w-[27px] h-[27px] cursor-pointer rtl-flip" src="../assets/list.png" alt="list"
            @click="toggleList" />
        </div>

        <ul  v-click-outside="hideList" v-if="showList"
          class="absolute bg-white border rounded-xl mt-[230px] p-2 w-[200px] left-3 sm:left-4 md:left-6 lg:left-8 xl:left-12">
          <li v-for="(option, index) in options" :key="index" @click="selectOption(option)"
            class="rounded-xl h-[40px] mb-5 hover:bg-gray-200">
            <span class="flex items-center ">
              <img class="w-6 h-6 mt-2  ml-4 mr-4" :src="option.icon" alt="icon">
              <p class="text-gray-600">{{ option.name }}</p>
            </span>
          </li>
        </ul>
      </div>

      <div class="h-[600px] rounded-b-xl border-2 border-t-0 border-customGreen">
        <div class="custom-bg bg-white flex flex-col space-y-4 overflow-y-auto h-[550px] p-4">
          <div class="message-sent bg-custgreen text-gray-800 p-3 rounded-lg max-w-xs self-start">
            <p>هذا هو نص الرسالة المرسلة</p>

            <span class="flex  justify-end text-xs text-gray-800 mt-2" dir="ltr">
              <span class="text-right">{{ '10:15 PM' }}</span>
              <img src="../assets/check.png" alt="sent&read" class="w-5 h-5 ml-2" />
            </span>


          </div>
          <div class="message-received bg-white text-gray-800 p-3 rounded-lg max-w-xs self-end">
            <p>هذا هو نص الرسالة المستلمة</p>
            <span class="text-xs text-gray-800 mt-1 text-right" dir="ltr">{{ '10:17 PM' }}</span>
          </div>
          <div class="message-center bg-yellcolor text-gray-800 p-3 rounded-lg self-center text-center max-w-[480px]">
            <p>بدأ أم عمر المحادثة يوم الاثنين 17 مايو 2021 الساعة 09:56 ص</p>
          </div>
        </div>

        <div class="flex items-center gap-2 p-2">
  <img src="../assets/happiness.png" class="w-6 h-6 mr-2" alt="emojis" @click="toggleEmojiPicker">
  <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload">
  
  <div class="flex-grow w-full sm:w-[300px] md:w-[550px] lg:w-[650px] xl:w-[750px]">
    <textarea 
      v-model="message" 
      placeholder="اكتب الرسالة"
      class="w-full h-10 bg-transparent focus:outline-none px-2 sm:px-4 text-gray-400 border rounded-full resize-none overflow-hidden leading-10"
      rows="1"
      @input="adjustTextareaHeight"
    ></textarea>
  </div>
  
  <button class="flex-shrink-0 flex items-center justify-center w-10 h-10" >
    <img src="../assets/attach-file.png" class="w-8 h-8" alt="upload" @click="triggerFileUpload">

  </button>
</div>

<div v-if="showEmojiPicker" class="emoji-picker w-full sm:w-[300px] md:w-[350px] h-[300px] overflow-y-auto 
  fixed sm:absolute bg-white border rounded 
  bottom-0 sm:bottom-auto left-0 sm:left-auto
  -mt-[300px] sm:-mt-[340px] md:right-[400px] 
  -mt-[300px] sm:-mt-[340px] md:right-[400px] scrollbar-thin
  z-50">
  <div class="p-2 border-b flex justify-between items-center sm:hidden">
    <span>Emojis</span>
    <button @click="showEmojiPicker = false" class="text-xl">&times;</button>
  </div>
  <EmojiPicker @emoji-select="addEmoji"
    class="[&_img]:w-8 [&_img]:h-8 sm:[&_img]:w-10 sm:[&_img]:h-10 [&_span]:text-xs" />
</div>
      </div>
    </div>
  </div>

</template>

<script>
import EmojiPicker from 'vue3-emoji-picker';

export default {
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unbind(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
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
        { id: 1, name: 'أم عمر', time: '09:15 PM', lastMessage: 'السلام عليكم', icon: require('../assets/mom.png'), unreadMessages: '2' },
        { id: 2, name: 'rahmani djamel 2', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png'), unreadMessages: '1' },
        { id: 3, name: 'Abdullah Imane', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/mom.png'), unreadMessages: '1' },
        { id: 4, name: 'khaled', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png'), unreadMessages: '0' },
        { id: 5, name: 'Lamine', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png'), unreadMessages: '2' },
        { id: 6, name: 'Lamine', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png'), unreadMessages: '0' },
        { id: 7, name: 'Lamine', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/new.png'), unreadMessages: '0' },
        { id: 8, name: 'Oum Lamiss', time: '09:18 PM', lastMessage: 'Salut', icon: require('../assets/mom.png'), unreadMessages: '0' },
      ],
      showList: false,
      options: [
        { name: 'تحويل لزميل', icon: require('../assets/go.png') },
        { name: 'دعوة زميل', icon: require('../assets/add-user.png') },
        { name: 'انهاء المحادثة', icon: require('../assets/x-mark.png') }
      ],
      participants: [
        { name: "dad" },
        { name: "جدة" },


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
      if (this.showEmojiPicker && this.isMobile) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
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
    hideList() {
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

.search-container {
  position: relative;
  width: 40px;
  transition: width 0.3s ease;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
}

.search-input {
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 100%;
  padding-left: 2.5rem;
  border: none;
  background-color: white;
  opacity: 0;
  transition: width 0.3s ease, opacity 0.3s ease;
}

.search-container:hover {
  width: 100%;
}

.search-container:hover .search-input {
  width: 100%;
  opacity: 1;
}

.search-input:focus {
  outline: none;
}
</style>