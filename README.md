# Handle Disconnect Internet

## Ý tưởng
- Xây dựng một function nhằm kiểm tra việt kết nối internet của trang trong quá trình load page.

![React App](https://user-images.githubusercontent.com/13729049/75121262-d8da8600-56c4-11ea-92c0-45e12fea9042.png)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Tạo nguồn lấy data

- Tạo helper một mảng images để load

```
const images = [
  {
    id: 1,
    image: 'https://gigamall.com.vn/data/2019/09/06/16581208_LOGO-GOJOY-500x500.jpg',
  },
  {
    id: 2,
    image: 'https://chovatlieuxaydung.com.vn/thuonghieu/upload/images/gach%20gia%20go%2050x50%20ma%209543.png',
  },
  {
    id: 3,
    image: 'https://gigamall.vn/data/2019/08/05/14245381_logo-mumuso-500x500.jpg',
  },
  {
    id: 4,
    image: 'https://surroundvision.co.uk/wp-content/uploads/2018/10/Parley-F_-tip-of-an-iceberg-500x500.jpg',
  },
  {
    id: 5,
    image: 'https://www.agrimaccari.com/en/wp-content/uploads/2015/05/girl-500x500.jpg',
  },
    {
    id: 6,
    image: 'https://gigamall.com.vn/data/2019/09/06/16581208_LOGO-GOJOY-500x500.jpg',
  },
  {
    id: 7,
    image: 'https://chovatlieuxaydung.com.vn/thuonghieu/upload/images/gach%20gia%20go%2050x50%20ma%209543.png',
  },
  {
    id: 8,
    image: 'https://gigamall.vn/data/2019/08/05/14245381_logo-mumuso-500x500.jpg',
  },
  {
    id: 9,
    image: 'https://surroundvision.co.uk/wp-content/uploads/2018/10/Parley-F_-tip-of-an-iceberg-500x500.jpg',
  },
  {
    id: 10,
    image: 'https://www.agrimaccari.com/en/wp-content/uploads/2015/05/girl-500x500.jpg',
  },
];

export default images;

```

### Kiểm tra online or offline

- Ý tưởng ở đây ta xây dựng một HOCs nhằm kiểm tra trạng thái kết nối internet, ở đây bạn có thể call đến 1 url nào đó để kiểm tra (ưu tiên trang cho kết quả load nhanh), sample: google.com

```
import React, { Component } from 'react';

export default function (ComposedComponent) {
  class Detect extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
              })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              });
            }).catch(() => this.setState({ isDisconnected: true }) )
          }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
          { isDisconnected && (<div className="error">
              <p>Không có kết nối internet</p>
            </div>)
          }
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return Detect;
}

```

- window.online và window.offline nhận thấy sự thay đổi này và kích hoạt phương thức handleConnectionChange

### Render page
- Ta render page từ thông qua App.js

```
import React, { Component } from 'react';
import './App.css';
import images from './helper/images'
import Detect from './hocs/Detect';

class App extends Component {
  renderImage() {
    return (
      <div className='image-list'>
        {images.map(data => <img src={data.image} alt='random' key={data.id} className="image" />)}
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <p className="page-title">Handle Disconnect Internet</p>
        {this.renderImage()}
      </div>
    );
  }
}

export default Detect(App);

```

- Mở page trên trình duyệt, tiến hành thực hiện disconect internet để kiểm tra kết quả.

### CSS

```
.app {
  text-align: center;
}

.app p {
  font-size: 30px;
}


.error {
  height: 60px;
  background: #ff8100;
  margin-top: 0;
  font-size: 20px;
}

.error p {
  font-size: 25px;
  line-height: 60px;
  color: #fff;
  margin: 0;
}

.page-title {
    text-align: center;
    font-size: 32px;
    margin-bottom: 0;
}

.image-list {
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  width: 1150px;
  margin: 100px auto;
}

.image-list img {
  max-width: 300px;
  width: 100%;
}

.image:hover {
  animation: animate-image 0.5s;
  animation-iteration-count: infinite;
}

@keyframes animate-image {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-1px, -2px) rotate(0deg); }
}

```
