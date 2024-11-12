<template>
  <ClientOnly>
    <div class="position-relative">
      <label :for="id" class="fd-container" :class="{active: dropping}" @dragenter="dragIn" @dragover="dragOver"
             @dragleave="dragOut" @drop="dragOut">
        <div class="fd-inner-container" v-if="!imageUrl">
          <div class="h-100">
            <div v-if="label" class="fd-labelText mb-2">{{ label }}</div>
            <div>
              <svg id="Group_25612" data-name="Group 25612" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="49.927" viewBox="0 0 50 49.927">
                <g id="Group_25020" data-name="Group 25020">
                  <path id="Path_22842" data-name="Path 22842"
                        d="M3.653,23.351c0-4.727.862-7.8,2.443-9.778,1.537-1.922,4.021-3.127,8.052-3.5l-.339-3.639C9.221,6.86,5.626,8.312,3.242,11.29.9,14.215,0,18.29,0,23.351Zm0,0H0v.317H3.653ZM17.073,37.087c-5.263,0-8.473-1.064-10.414-3.005S3.653,28.93,3.653,23.667H0c0,5.623,1.113,10.037,4.075,13s7.375,4.075,13,4.075Zm15.855,0H17.073V40.74H32.927ZM46.347,23.667c0,5.263-1.067,8.473-3.005,10.414s-5.153,3.005-10.414,3.005V40.74c5.623,0,10.037-1.115,13-4.075S50,29.291,50,23.667Zm0,0H50v-.317H46.347ZM35.667,10.046c4.111.356,6.639,1.554,8.2,3.478,1.6,1.975,2.479,5.063,2.479,9.827H50c0-5.1-.916-9.2-3.3-12.129-2.421-2.981-6.067-4.413-10.723-4.815Zm-21.52.024a1.827,1.827,0,0,0-.339-3.639ZM35.981,6.407a1.826,1.826,0,1,0-.314,3.639Z"
                        transform="translate(0 9.187)" fill="#3a3a3a"/>
                  <path id="Path_22843" data-name="Path 22843"
                        d="M13.173,2.947H9.52V30.662h3.653Zm0,0a1.827,1.827,0,0,0-3.653,0ZM9.52,30.662a1.827,1.827,0,1,0,3.653,0Z"
                        transform="translate(13.666 1.608)" fill="#3a3a3a"/>
                  <path id="Path_22844" data-name="Path 22844"
                        d="M14.864.533,6.705,8.692l2.584,2.584,8.156-8.159ZM25.607,8.692,17.446.533,14.864,3.117l8.159,8.159Zm-18.9,0a1.827,1.827,0,0,0,2.584,2.584Zm9.447-6.866L17.446.533a1.829,1.829,0,0,0-2.582,0Zm6.87,9.45a1.827,1.827,0,1,0,2.584-2.584Z"
                        transform="translate(8.857 0)" fill="#3a3a3a"/>
                </g>
              </svg>
              <div class="mt-3">{{ $t('upload_text_drag_drop') }}</div>
              <div class="mt-3 fw-lighter">
                <div v-if="sizeLabel">
                  {{ $t('upload_dimension_label', {n : sizeLabel}) }}
                </div>
                <div>
                  {{ $t('upload_size_label') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fd-preview" v-if="imageUrl" :style="{backgroundImage: `url(${imageUrl})`}"></div>
      </label>
      <input type="file" style="display: none;" :id="id" :accept="accept || 'image/*'" @change="handleFiles">
      <button v-if="imageUrl" @click="remove" class="fd-remove-btn" type="button">&times;</button>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  props: {
    label: String,
    accept: String,
    defaultImage: String,
    sizeLabel: String
  },
  data() {
    return {
      id: this.randomId(),
      dropping: false,
      imageUrl: '',
      localFile: null,
    }
  },
  methods: {
    randomId() {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
      var str = '';
      for (var i = 0; i < 4; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return `fd_${str}`;
    },
    dragIn(e) {
      e.preventDefault()
      e.stopPropagation()
      this.dropping = true
    },
    dragOver(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    dragOut(e) {
      e.preventDefault()
      e.stopPropagation()
      this.dropping = false
      if (e.type == 'drop') {
        this.handleFiles(e)
      }
    },
    getLocalImage() {
      if (!this.localFile) return ''
      return URL.createObjectURL(this.localFile)
    },
    handleFiles(e) {
      let t = e.dataTransfer ? e.dataTransfer : e.target
      if (t.files.length < 1) return

      this.localFile = t.files[0]
      this.imageUrl = this.getLocalImage()

      let files = []
      files.push({
        id: this.randomId(),
        file: t.files[0]
      })
      this.$emit('input', files)
    },
    remove(e) {
      e.stopPropagation()
      this.localFile = null
      this.imageUrl = ''
      this.$emit('input', [])
    }
  },
  beforeMount() {
    if (this.defaultImage) {
      this.imageUrl = this.defaultImage
    }
  }
}
</script>

<style scoped lang="scss">
.fw-lighter {
  font-weight: 100;
}

.fd-container {
  width: 100%;
  border: 1px dashed #707070;
  background-color: var(--bg-body);
  padding: 1rem;
  cursor: pointer;
  position: relative;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  overflow: hidden;

  .fd-inner-container {
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    pointer-events: none;
  }

  &.active {
    background-color: var(--primary-light);
    border: 1px solid var(--primary);

    .fd-inner-container {
    }
  }
}

.fd-labelText {
  color: var(--border);
  font-size: 1rem;
  font-weight: 500;
}

.fd-drop-icon {
  width: 30px;
  height: 30px;
}

.fd-preview {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
}

.fd-remove-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #fff;
  background-color: #0000005F;
  border-radius: 50%;
  font-size: 30px;
  line-height: 1;
  width: 32px;
  height: 32px;
  border: none;
}
</style>