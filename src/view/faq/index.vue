<template>
  <div class="content pp-faq-container">
    <div className="text-content copy-text">
      <div>
        <h1 class="question">一、如何挂单出租你的河里人</h1>
        <ol>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">1</span>
            </span>
            <span class="li-row"
              >在网站上连接你的钱包。（此处以小狐狸钱包为例）</span
            >
          </li>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">2</span>
            </span>
            <span class="li-row"
              >点击网页端此处的“出租”按钮，可以看到你现在账户中已经持有的河里人NFT。</span
            >
            <img class="faq-img" src="assets/faq/how-to-lend-an-nft.png" />
          </li>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">3</span>
            </span>
            <span class="li-row"> 选择你要出租的河里人，点击“马上出租”</span>
            <img class="faq-img" src="assets/faq/how-to-lend-an-nft2.png" />
          </li>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">4</span>
            </span>
            <span class="li-row">
              在此处设置你的租金，租期（最短半天），以及抵押金（租借NFT的那一方缴纳）。
            </span>
          </li>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">5</span>
            </span>
            <span class="li-row"
              >设置完成。此时你的河里人已经可以在“市场”上可见。</span
            >
          </li>
        </ol>
        <div>
          <h2>注释：</h2>
          <ol>
            <li>
              <span class="li-span">
                <span class="li-back"></span>
                <span class="li-text">1</span>
              </span>
              <span class="li-row"
                >在你的河里人尚未被租出之前，你可以修改你的初始租金、租期、以及抵押金数额，以应对市场价格的波动。（警告！由于以太坊的特殊性，所有的操作都会再次缴纳GAS费，请谨慎操作。）</span
              >
            </li>
            <li>
              <span class="li-span">
                <span class="li-back"></span>
                <span class="li-text">2</span>
              </span>
              <span class="li-row"
                >租赁系统没有挂单时长限制，所以不必担心会被系统撤单。如果你想要撤回挂单，请至“个人中心”的“正在出租”处，并撤单。</span
              >
            </li>
            <li>
              <span class="li-span">
                <span class="li-back"></span>
                <span class="li-text">3</span>
              </span>
              <span class="li-row"
                >个人中心有两个界面，使用此处的按钮来查看你“正在出租”或“已经租入”的河里人。</span
              >
            </li>
          </ol>
          <div style="margin-top: 1em; text-align: center">
            <img class="faq-img" src="assets/faq/lend-modal.png" />
            <img class="faq-img" src="assets/faq/lend-modal2.png" />
          </div>
        </div>
      </div>
      <br />
      <div>
        <h1 class="question">二、如何租借河里人</h1>
        <ol>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">1</span>
            </span>
            <span class="li-row">连接钱包。（此处以小狐狸为例）</span>
          </li>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">2</span>
            </span>
            <span class="li-row">点击“市场”或者右上的搜索按钮</span>
          </li>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">3</span>
            </span>
            <span class="li-row">寻找你想要租借的河里人。</span>
          </li>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">4</span>
            </span>
            <span class="li-row">缴纳租金以及抵押金。</span>
          </li>
          <li>
            <span class="li-span">
              <span class="li-back"></span>
              <span class="li-text">5</span>
            </span>
            <span class="li-row"
              >在租借完毕后，请至“个人中心”的“已经租入”处归还</span
            >
          </li>
        </ol>
        <img class="faq-img" src="assets/faq/rent-modal.png" />
        <div>
          <h2>注释：</h2>
          <ol>
            <li>
              <span class="li-row"
                >一旦超过租方设置的归还日期，你的抵押金将不再归还给。请按时归还。</span
              >
            </li>
          </ol>
          <div style="margin-top: 1em; text-align: center">
            <img class="faq-img" src="assets/faq/lend-modal.png" />
            <img class="faq-img" src="assets/faq/lend-modal2.png" />
          </div>
        </div>
        <div>
          <h2>几点需要注意的：</h2>
          <ol>
            <li>
              <span class="li-span">
                <span class="li-back"></span>
                <span class="li-text">1</span>
              </span>
              <span class="li-row"
                >本租赁系统基于智能合约。所有的抵押金、NFT都和合约交互，安全性可以保证。但其他的交易风险（比如对方逾期不还）需要用户自担。所以请设置合理的质押金。</span
              >
            </li>
            <li>
              <span class="li-span">
                <span class="li-back"></span>
                <span class="li-text">2</span>
              </span>
              <span class="li-row"
                >谨慎辨别“已经合成”过的河里人。合成过的河里人无法再次合成。
                我们无法提供验证，请用户自己登陆官方查看该河里人，来验证是否已经合成。</span
              >
            </li>
            <li>
              <span class="li-span">
                <span class="li-back"></span>
                <span class="li-text">3</span>
              </span>
              <span class="li-row"
                >所有的手续费（即gas费）都是基于以太坊的交易系统的，和合作社并无关系。</span
              >
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.faq-img {
  width: 100%;
  justify-content: center;
  margin: 20px 0%;
}
.img-li {
  display: inline-block;
  width: 20px;
  height: 20px;
}
h1 {
  font-size: 3rem;
  margin: 10px 0px;
}
h2 {
  margin-top: 3rem;
  font-size: 2.4rem;
}
li {
  margin-top: 2rem;
}
.li-row {
  margin-left: 36px;
  line-height: 3rem;
}
.li-span {
  position: relative;
  top: 10px;
  .li-back {
    background: rgb(145, 0, 212);
    position: absolute;
    width: 30px;
    height: 30px;
    z-index: -1;
    border-radius: 15px;
  }
  .li-text {
    text-align: center;
    width: 30px;
    position: absolute;
  }
}
</style>
