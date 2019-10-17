import React from "react";
import "./App.css";
import SignatureCanvas from "react-signature-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      img: "",
      fileName: ""
    };
    this.makePdf = this.makePdf.bind(this);
    this.textChange = this.textChange.bind(this);
    this.onPdfDownload = this.onPdfDownload.bind(this);
  }

  makePdf() {
    console.log(html2canvas, this.pdf);
    html2canvas(this.pdf).then(canvas => {
      const img = canvas.toDataURL("image/png");

      console.log(img);
      this.setState({ img });
    });
  }

  textChange({ target: { value } }) {
    this.setState({ fileName: value });
  }

  onPdfDownload() {
    const { img, fileName } = this.state;
    if (!img) return;
    /**pdf 로 받게 하기 위해선 아래와 같은 작업 필요 */
    const pdf = new jsPDF("a4");
    pdf.addImage(img, "PNG", 0, 0);
    pdf.save(fileName);
  }

  render() {
    const { img, fileName } = this.state;
    return (
      <div
        className="App"
        style={{ width: "793px" }}
        ref={ref => {
          this.pdf = ref;
        }}
      >
        <div>동의하시겠습니까?</div>
        <input
          className="input"
          onChange={this.textChange}
          placeholder="파일이름을 직접 입력해주세요. ex> test.png"
        />
        <div>
          <SignatureCanvas
            penColor="green"
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
          />
        </div>
        <button onClick={this.makePdf}>MAKE!!</button>
        <hr />
        <h3>아래는 복사된 내용이 표기됩니다.</h3>
        <div
          ref={ref => {
            this.copy = ref;
          }}
        ></div>
        {img && (
          <React.Fragment>
            <img src={img} alt="img" />
            <a download={fileName} href={img} title="Download pdf document">
              PNG로 다운로드하기!
            </a>
            <button onClick={this.onPdfDownload}>PDF로 다운로드하기</button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
