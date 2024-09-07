﻿!function (ae) {
  function se(ue, he) {
    if (!(1 < ue.originalEvent.touches.length)) {
      ue.preventDefault();
      var me = ue.originalEvent.changedTouches[0]
        , ge = document.createEvent("MouseEvents");
      ge.initMouseEvent(he, !0, !0, window, 1, me.screenX, me.screenY, me.clientX, me.clientY, !1, !1, !1, !1, 0, null),
        ue.target.dispatchEvent(ge)
    }
  }
  if (ae.support.touch = "ontouchend" in document,
    ae.support.touch) {
    var le, de = ae.ui.mouse.prototype, ce = de._mouseInit, pe = de._mouseDestroy;
    de._touchStart = function (ue) {
      var he = this;
      !le && he._mouseCapture(ue.originalEvent.changedTouches[0]) && (le = !0,
        he._touchMoved = !1,
        se(ue, "mouseover"),
        se(ue, "mousemove"),
        se(ue, "mousedown"))
    }
      ,
      de._touchMove = function (ue) {
        le && (this._touchMoved = !0,
          se(ue, "mousemove"))
      }
      ,
      de._touchEnd = function (ue) {
        le && (se(ue, "mouseup"),
          se(ue, "mouseout"),
          this._touchMoved || se(ue, "click"),
          le = !1)
      }
      ,
      de._mouseInit = function () {
        var ue = this;
        ue.element.bind({
          touchstart: ae.proxy(ue, "_touchStart"),
          touchmove: ae.proxy(ue, "_touchMove"),
          touchend: ae.proxy(ue, "_touchEnd")
        }),
          ce.call(ue)
      }
      ,
      de._mouseDestroy = function () {
        var ue = this;
        ue.element.unbind({
          touchstart: ae.proxy(ue, "_touchStart"),
          touchmove: ae.proxy(ue, "_touchMove"),
          touchend: ae.proxy(ue, "_touchEnd")
        }),
          pe.call(ue)
      }
  }
}(jQuery),
  function (ae, se, le, de, ce, pe) {
    function ue(mn, gn, yn, bn, vn) {
      return xe(mn, mn, yn, bn, gn, mn.defaultView.pageXOffset, mn.defaultView.pageYOffset).then(function (wn) {
        He("Document cloned");
        var xn = en + vn
          , kn = "[" + xn + "='" + vn + "']";
        mn.querySelector(kn).removeAttribute(xn);
        var Cn = wn.contentWindow
          , En = Cn.document.querySelector(kn);
        return ("function" == typeof gn.onclone ? Promise.resolve(gn.onclone(Cn.document)) : Promise.resolve(!0)).then(function () {
          return he(En, wn, gn, yn, bn)
        })
      })
    }
    function he(mn, gn, yn, bn, vn) {
      var wn = gn.contentWindow
        , xn = new qo(wn.document)
        , kn = new je(yn, xn)
        , Cn = Ge(mn)
        , En = "view" === yn.type ? bn : fe(wn.document)
        , Sn = "view" === yn.type ? vn : ye(wn.document)
        , Tn = new yn.renderer(En, Sn, kn, yn, se);
      return new Je(mn, Tn, xn, kn, yn).ready.then(function () {
        He("Finished rendering");
        var In;
        return In = "view" === yn.type ? ge(Tn.canvas, {
          width: Tn.canvas.width,
          height: Tn.canvas.height,
          top: 0,
          left: 0,
          x: 0,
          y: 0
        }) : mn === wn.document.body || mn === wn.document.documentElement || null != yn.canvas ? Tn.canvas : ge(Tn.canvas, {
          width: null == yn.width ? Cn.width : yn.width,
          height: null == yn.height ? Cn.height : yn.height,
          top: Cn.top,
          left: Cn.left,
          x: wn.pageXOffset,
          y: wn.pageYOffset
        }),
          me(gn, yn),
          In
      })
    }
    function me(mn, gn) {
      gn.removeContainer && (mn.parentNode.removeChild(mn),
        He("Cleaned up container"))
    }
    function ge(mn, gn) {
      var yn = se.createElement("canvas")
        , bn = Math.min(mn.width - 1, Math.max(0, gn.left))
        , vn = Math.min(mn.width, Math.max(1, gn.left + gn.width))
        , wn = Math.min(mn.height - 1, Math.max(0, gn.top))
        , xn = Math.min(mn.height, Math.max(1, gn.top + gn.height));
      return yn.width = gn.width,
        yn.height = gn.height,
        He("Cropping canvas at:", "left:", gn.left, "top:", gn.top, "width:", vn - bn, "height:", xn - wn),
        He("Resulting crop with width", gn.width, "and height", gn.height, " with x", bn, "and y", wn),
        yn.getContext("2d").drawImage(mn, bn, wn, vn - bn, xn - wn, gn.x, gn.y, vn - bn, xn - wn),
        yn
    }
    function fe(mn) {
      return Math.max(Math.max(mn.body.scrollWidth, mn.documentElement.scrollWidth), Math.max(mn.body.offsetWidth, mn.documentElement.offsetWidth), Math.max(mn.body.clientWidth, mn.documentElement.clientWidth))
    }
    function ye(mn) {
      return Math.max(Math.max(mn.body.scrollHeight, mn.documentElement.scrollHeight), Math.max(mn.body.offsetHeight, mn.documentElement.offsetHeight), Math.max(mn.body.clientHeight, mn.documentElement.clientHeight))
    }
    function be() {
      return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    }
    function ve() {
      return se.documentMode && 9 >= se.documentMode
    }
    function we(mn, gn) {
      for (var yn = 3 === mn.nodeType ? se.createTextNode(mn.nodeValue) : mn.cloneNode(!1), bn = mn.firstChild; bn;)
        !0 !== gn && 1 === bn.nodeType && "SCRIPT" === bn.nodeName || yn.appendChild(we(bn, gn)),
          bn = bn.nextSibling;
      return yn
    }
    function xe(mn, gn, yn, bn, vn, wn, xn) {
      Te(mn);
      var kn = ve() ? we(mn.documentElement, vn.javascriptEnabled) : mn.documentElement.cloneNode(!0)
        , Cn = gn.createElement("iframe");
      return Cn.className = "html2canvas-container",
        Cn.style.visibility = "hidden",
        Cn.style.position = "fixed",
        Cn.style.left = "-10000px",
        Cn.style.top = "0px",
        Cn.style.border = "0",
        Cn.width = yn,
        Cn.height = bn,
        Cn.scrolling = "no",
        gn.body.appendChild(Cn),
        new Promise(function (En) {
          var Sn = Cn.contentWindow.document;
          ke(mn.documentElement, kn, "textarea"),
            ke(mn.documentElement, kn, "select"),
            Cn.contentWindow.onload = Cn.onload = function () {
              var Tn = setInterval(function () {
                0 < Sn.body.childNodes.length && (Ie(mn, Sn),
                  clearInterval(Tn),
                  "view" === vn.type && Cn.contentWindow.scrollTo(wn, xn),
                  En(Cn))
              }, 50)
            }
            ,
            Sn.open(),
            Sn.write("<!DOCTYPE html><html></html>"),
            Ce(mn, wn, xn),
            Sn.replaceChild(!0 === vn.javascriptEnabled ? Sn.adoptNode(kn) : Oe(Sn.adoptNode(kn)), Sn.documentElement),
            Sn.close()
        }
        )
    }
    function ke(mn, gn, yn) {
      for (var bn = mn.getElementsByTagName(yn), vn = gn.getElementsByTagName(yn), wn = bn.length, xn = 0; xn < wn; xn++)
        vn[xn].value = bn[xn].value
    }
    function Ce(mn, gn, yn) {
      mn.defaultView && (gn !== mn.defaultView.pageXOffset || yn !== mn.defaultView.pageYOffset) && mn.defaultView.scrollTo(gn, yn)
    }
    function Ee(mn, gn, yn, bn, vn, wn) {
      return new Po(mn, gn, ae.document).then(Se(mn)).then(function (xn) {
        return xe(xn, yn, bn, vn, wn, 0, 0)
      })
    }
    function Se(mn) {
      return function (gn) {
        var yn, bn = new DOMParser;
        try {
          yn = bn.parseFromString(gn, "text/html")
        } catch (xn) {
          He("DOMParser not supported, falling back to createHTMLDocument"),
            yn = se.implementation.createHTMLDocument("");
          try {
            yn.open(),
              yn.write(gn),
              yn.close()
          } catch (kn) {
            He("createHTMLDocument write not supported, falling back to document.body.innerHTML"),
              yn.body.innerHTML = gn
          }
        }
        var vn = yn.querySelector("base");
        if (!vn || !vn.href.host) {
          var wn = yn.createElement("base");
          wn.href = mn,
            yn.head.insertBefore(wn, yn.head.firstChild)
        }
        return yn
      }
    }
    function Te(mn) {
      [].slice.call(mn.querySelectorAll("canvas"), 0).forEach(function (gn) {
        gn.setAttribute(tn, "canvas-" + on++)
      })
    }
    function Ie(mn, gn) {
      [].slice.call(mn.querySelectorAll("[" + tn + "]"), 0).forEach(function (yn) {
        try {
          var bn = gn.querySelector("[" + tn + "=\"" + yn.getAttribute(tn) + "\"]");
          bn && (bn.width = yn.width,
            bn.height = yn.height,
            bn.getContext("2d").putImageData(yn.getContext("2d").getImageData(0, 0, yn.width, yn.height), 0, 0))
        } catch (vn) {
          He("Unable to copy canvas content from", yn, vn)
        }
        yn.removeAttribute(tn)
      })
    }
    function Oe(mn) {
      return [].slice.call(mn.childNodes, 0).filter(Ae).forEach(function (gn) {
        "SCRIPT" === gn.tagName ? mn.removeChild(gn) : Oe(gn)
      }),
        mn
    }
    function Ae(mn) {
      return mn.nodeType === Node.ELEMENT_NODE
    }
    function Le(mn) {
      var gn = se.createElement("a");
      return gn.href = mn,
        gn.href = gn.href,
        gn
    }
    function Re(mn) {
      this.r = 0,
        this.g = 0,
        this.b = 0,
        this.a = null,
        this.fromArray(mn) || this.namedColor(mn) || this.rgb(mn) || this.rgba(mn) || this.hex6(mn) || this.hex3(mn)
    }
    function Ne(mn) {
      if (this.src = mn,
        He("DummyImageContainer for", mn),
        !this.promise || !this.image) {
        He("Initiating DummyImageContainer"),
          Ne.prototype.image = new Image;
        var gn = this.image;
        Ne.prototype.promise = new Promise(function (yn, bn) {
          gn.onload = yn,
            gn.onerror = bn,
            gn.src = be(),
            !0 === gn.complete && yn(gn)
        }
        )
      }
    }
    function Be(mn, gn) {
      var yn, bn, vn = se.createElement("div"), wn = se.createElement("img"), xn = se.createElement("span");
      vn.style.visibility = "hidden",
        vn.style.fontFamily = mn,
        vn.style.fontSize = gn,
        vn.style.margin = 0,
        vn.style.padding = 0,
        se.body.appendChild(vn),
        wn.src = be(),
        wn.width = 1,
        wn.height = 1,
        wn.style.margin = 0,
        wn.style.padding = 0,
        wn.style.verticalAlign = "baseline",
        xn.style.fontFamily = mn,
        xn.style.fontSize = gn,
        xn.style.margin = 0,
        xn.style.padding = 0,
        xn.appendChild(se.createTextNode("Hidden Text")),
        vn.appendChild(xn),
        vn.appendChild(wn),
        yn = wn.offsetTop - xn.offsetTop + 1,
        vn.removeChild(xn),
        vn.appendChild(se.createTextNode("Hidden Text")),
        vn.style.lineHeight = "normal",
        wn.style.verticalAlign = "super",
        bn = wn.offsetTop - vn.offsetTop + 1,
        se.body.removeChild(vn),
        this.baseline = yn,
        this.lineWidth = 1,
        this.middle = bn
    }
    function De() {
      this.data = {}
    }
    function Pe(mn, gn, yn) {
      this.image = null,
        this.src = mn;
      var bn = this
        , vn = Ge(mn);
      this.promise = (gn ? new Promise(function (wn) {
        "about:blank" === mn.contentWindow.document.URL || null == mn.contentWindow.document.documentElement ? mn.contentWindow.onload = mn.onload = function () {
          wn(mn)
        }
          : wn(mn)
      }
      ) : this.proxyLoad(yn.proxy, vn, yn)).then(function (wn) {
        return html2canvas(wn.contentWindow.document.documentElement, {
          type: "view",
          width: wn.width,
          height: wn.height,
          proxy: yn.proxy,
          javascriptEnabled: yn.javascriptEnabled,
          removeContainer: yn.removeContainer,
          allowTaint: yn.allowTaint,
          imageTimeout: yn.imageTimeout / 2
        })
      }).then(function (wn) {
        return bn.image = wn
      })
    }
    function _e(mn) {
      this.src = mn.value,
        this.colorStops = [],
        this.type = null,
        this.x0 = .5,
        this.y0 = .5,
        this.x1 = .5,
        this.y1 = .5,
        this.promise = Promise.resolve(!0)
    }
    function Me(mn, gn) {
      this.src = mn,
        this.image = new Image;
      var yn = this;
      this.tainted = null,
        this.promise = new Promise(function (bn, vn) {
          yn.image.onload = bn,
            yn.image.onerror = vn,
            gn && (yn.image.crossOrigin = "anonymous"),
            yn.image.src = mn,
            !0 === yn.image.complete && bn(yn.image)
        }
        )
    }
    function je(mn, gn) {
      this.link = null,
        this.options = mn,
        this.support = gn,
        this.origin = this.getOrigin(ae.location.href)
    }
    function We(mn) {
      _e.apply(this, arguments),
        this.type = this.TYPES.LINEAR;
      var gn = null === mn.args[0].match(this.stepRegExp);
      gn ? mn.args[0].split(" ").reverse().forEach(function (yn) {
        switch (yn) {
          case "left":
            this.x0 = 0,
              this.x1 = 1;
            break;
          case "top":
            this.y0 = 0,
              this.y1 = 1;
            break;
          case "right":
            this.x0 = 1,
              this.x1 = 0;
            break;
          case "bottom":
            this.y0 = 1,
              this.y1 = 0;
            break;
          case "to":
            var bn = this.y0
              , vn = this.x0;
            this.y0 = this.y1,
              this.x0 = this.x1,
              this.x1 = vn,
              this.y1 = bn;
        }
      }, this) : (this.y0 = 0,
        this.y1 = 1),
        this.colorStops = mn.args.slice(gn ? 1 : 0).map(function (yn) {
          var bn = yn.match(this.stepRegExp);
          return {
            color: new Re(bn[1]),
            stop: "%" === bn[3] ? bn[2] / 100 : null
          }
        }, this),
        null === this.colorStops[0].stop && (this.colorStops[0].stop = 0),
        null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1),
        this.colorStops.forEach(function (yn, bn) {
          null === yn.stop && this.colorStops.slice(bn).some(function (vn, wn) {
            return null !== vn.stop && (yn.stop = (vn.stop - this.colorStops[bn - 1].stop) / (wn + 1) + this.colorStops[bn - 1].stop,
              !0)
          }, this)
        }, this)
    }
    function He() {
      ae.html2canvas.logging && ae.console && ae.console.log && Function.prototype.bind.call(ae.console.log, ae.console).apply(ae.console, [Date.now() - ae.html2canvas.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
    }
    function Fe(mn, gn) {
      this.node = mn,
        this.parent = gn,
        this.stack = null,
        this.bounds = null,
        this.borders = null,
        this.clip = [],
        this.backgroundClip = [],
        this.offsetBounds = null,
        this.visible = null,
        this.computedStyles = null,
        this.colors = {},
        this.styles = {},
        this.backgroundImages = null,
        this.transformData = null,
        this.transformMatrix = null,
        this.isPseudoElement = !1,
        this.opacity = null
    }
    function Ve(mn) {
      var gn = mn.options[mn.selectedIndex || 0];
      return gn ? gn.text || "" : ""
    }
    function ze(mn) {
      if (mn && "matrix" === mn[1])
        return mn[2].split(",").map(function (gn) {
          return parseFloat(gn.trim())
        })
    }
    function qe(mn) {
      return -1 !== mn.toString().indexOf("%")
    }
    function Xe(mn) {
      var gn, yn, bn, vn, wn, xn, kn, Cn = [], En = 0, Sn = 0, Tn = function () {
        gn && ("\"" === yn.substr(0, 1) && (yn = yn.substr(1, yn.length - 2)),
          yn && kn.push(yn),
          "-" === gn.substr(0, 1) && 0 < (vn = gn.indexOf("-", 1) + 1) && (bn = gn.substr(0, vn),
            gn = gn.substr(vn)),
          Cn.push({
            prefix: bn,
            method: gn.toLowerCase(),
            value: wn,
            args: kn,
            image: null
          })),
          kn = [],
          gn = bn = yn = wn = ""
      };
      return kn = [],
        gn = bn = yn = wn = "",
        mn.split("").forEach(function (In) {
          if (!(0 == En && -1 < " \r\n\t".indexOf(In))) {
            switch (In) {
              case "\"":
                xn ? xn === In && (xn = null) : xn = In;
                break;
              case "(":
                if (xn)
                  break;
                if (0 == En)
                  return En = 1,
                    void (wn += In);
                Sn++;
                break;
              case ")":
                if (xn)
                  break;
                if (1 == En) {
                  if (0 == Sn)
                    return En = 0,
                      wn += In,
                      void Tn();
                  Sn--
                }
                break;
              case ",":
                if (xn)
                  break;
                if (0 == En)
                  return void Tn();
                if (1 == En && 0 == Sn && !gn.match(/^url$/i))
                  return kn.push(yn),
                    yn = "",
                    void (wn += In);
            }
            wn += In,
              0 == En ? gn += In : yn += In
          }
        }),
        Tn(),
        Cn
    }
    function Ye(mn) {
      return mn.replace("px", "")
    }
    function Ue(mn) {
      return parseFloat(mn)
    }
    function Ge(mn) {
      if (mn.getBoundingClientRect) {
        var gn = mn.getBoundingClientRect()
          , yn = null == mn.offsetWidth ? gn.width : mn.offsetWidth;
        return {
          top: gn.top,
          bottom: gn.bottom || gn.top + gn.height,
          right: gn.left + yn,
          left: gn.left,
          width: yn,
          height: null == mn.offsetHeight ? gn.height : mn.offsetHeight
        }
      }
      return {}
    }
    function Qe(mn) {
      var gn = mn.offsetParent ? Qe(mn.offsetParent) : {
        top: 0,
        left: 0
      };
      return {
        top: mn.offsetTop + gn.top,
        bottom: mn.offsetTop + mn.offsetHeight + gn.top,
        right: mn.offsetLeft + gn.left + mn.offsetWidth,
        left: mn.offsetLeft + gn.left,
        width: mn.offsetWidth,
        height: mn.offsetHeight
      }
    }
    function Je(mn, gn, yn, bn, vn) {
      He("Starting NodeParser"),
        this.renderer = gn,
        this.options = vn,
        this.range = null,
        this.support = yn,
        this.renderQueue = [],
        this.stack = new zo(!0, 1, mn.ownerDocument, null);
      var wn = new Fe(mn, null);
      if (vn.background && gn.rectangle(0, 0, gn.width, gn.height, new Re(vn.background)),
        mn === mn.ownerDocument.documentElement) {
        var xn = new Fe(wn.color("backgroundColor").isTransparent() ? mn.ownerDocument.body : mn.ownerDocument.documentElement, null);
        gn.rectangle(0, 0, gn.width, gn.height, xn.color("backgroundColor"))
      }
      wn.visibile = wn.isElementVisible(),
        this.createPseudoHideStyles(mn.ownerDocument),
        this.disableAnimations(mn.ownerDocument),
        this.nodes = Lo([wn].concat(this.getChildren(wn)).filter(function (kn) {
          return kn.visible = kn.isElementVisible()
        }).map(this.getPseudoElements, this)),
        this.fontMetrics = new De,
        He("Fetched nodes, total:", this.nodes.length),
        He("Calculate overflow clips"),
        this.calculateOverflowClips(),
        He("Start fetching images"),
        this.images = bn.fetch(this.nodes.filter(xo)),
        this.ready = this.images.ready.then(To(function () {
          return He("Images loaded, starting parsing"),
            He("Creating stacking contexts"),
            this.createStackingContexts(),
            He("Sorting stacking contexts"),
            this.sortStackingContexts(this.stack),
            this.parse(this.stack),
            He("Render queue created with " + this.renderQueue.length + " items"),
            new Promise(To(function (kn) {
              vn.async ? "function" == typeof vn.async ? vn.async.call(this, this.renderQueue, kn) : 0 < this.renderQueue.length ? (this.renderIndex = 0,
                this.asyncRenderer(this.renderQueue, kn)) : kn() : (this.renderQueue.forEach(this.paint, this),
                  kn())
            }, this))
        }, this))
    }
    function Ke(mn) {
      return mn.parent && mn.parent.clip.length
    }
    function Ze(mn) {
      return mn.replace(/(\-[a-z])/g, function (gn) {
        return gn.toUpperCase().replace("-", "")
      })
    }
    function $e() {}
    function eo(mn, gn, yn, bn) {
      return mn.map(function (vn, wn) {
        if (0 < vn.width) {
          var xn = gn.left
            , kn = gn.top
            , Cn = gn.width
            , En = gn.height - mn[2].width;
          0 === wn ? (En = mn[0].width,
            vn.args = ro({
              c1: [xn, kn],
              c2: [xn + Cn, kn],
              c3: [xn + Cn - mn[1].width, kn + En],
              c4: [xn + mn[3].width, kn + En]
            }, bn[0], bn[1], yn.topLeftOuter, yn.topLeftInner, yn.topRightOuter, yn.topRightInner)) : 1 === wn ? (xn = gn.left + gn.width - mn[1].width,
              Cn = mn[1].width,
              vn.args = ro({
                c1: [xn + Cn, kn],
                c2: [xn + Cn, kn + En + mn[2].width],
                c3: [xn, kn + En],
                c4: [xn, kn + mn[0].width]
              }, bn[1], bn[2], yn.topRightOuter, yn.topRightInner, yn.bottomRightOuter, yn.bottomRightInner)) : 2 === wn ? (kn = kn + gn.height - mn[2].width,
                En = mn[2].width,
                vn.args = ro({
                  c1: [xn + Cn, kn + En],
                  c2: [xn, kn + En],
                  c3: [xn + mn[3].width, kn],
                  c4: [xn + Cn - mn[3].width, kn]
                }, bn[2], bn[3], yn.bottomRightOuter, yn.bottomRightInner, yn.bottomLeftOuter, yn.bottomLeftInner)) : 3 === wn ? (Cn = mn[3].width,
                  vn.args = ro({
                    c1: [xn, kn + En + mn[2].width],
                    c2: [xn, kn],
                    c3: [xn + Cn, kn + mn[0].width],
                    c4: [xn + Cn, kn + En]
                  }, bn[3], bn[0], yn.bottomLeftOuter, yn.bottomLeftInner, yn.topLeftOuter, yn.topLeftInner)) : void 0
        }
        return vn
      })
    }
    function to(mn, gn, yn, bn) {
      var vn = 4 * ((Math.sqrt(2) - 1) / 3)
        , wn = yn * vn
        , xn = bn * vn
        , kn = mn + yn
        , Cn = gn + bn;
      return {
        topLeft: no({
          x: mn,
          y: Cn
        }, {
          x: mn,
          y: Cn - xn
        }, {
          x: kn - wn,
          y: gn
        }, {
          x: kn,
          y: gn
        }),
        topRight: no({
          x: mn,
          y: gn
        }, {
          x: mn + wn,
          y: gn
        }, {
          x: kn,
          y: Cn - xn
        }, {
          x: kn,
          y: Cn
        }),
        bottomRight: no({
          x: kn,
          y: gn
        }, {
          x: kn,
          y: gn + xn
        }, {
          x: mn + wn,
          y: Cn
        }, {
          x: mn,
          y: Cn
        }),
        bottomLeft: no({
          x: kn,
          y: Cn
        }, {
          x: kn - wn,
          y: Cn
        }, {
          x: mn,
          y: gn + xn
        }, {
          x: mn,
          y: gn
        })
      }
    }
    function oo(mn, gn, yn) {
      var bn = mn.left
        , vn = mn.top
        , wn = mn.width
        , xn = mn.height
        , kn = gn[0][0]
        , Cn = gn[0][1]
        , En = gn[1][0]
        , Sn = gn[1][1]
        , Tn = gn[2][0]
        , In = gn[2][1]
        , On = gn[3][0]
        , An = gn[3][1]
        , Ln = wn - En
        , Rn = xn - In
        , Nn = wn - Tn
        , Bn = xn - An;
      return {
        topLeftOuter: to(bn, vn, kn, Cn).topLeft.subdivide(.5),
        topLeftInner: to(bn + yn[3].width, vn + yn[0].width, Math.max(0, kn - yn[3].width), Math.max(0, Cn - yn[0].width)).topLeft.subdivide(.5),
        topRightOuter: to(bn + Ln, vn, En, Sn).topRight.subdivide(.5),
        topRightInner: to(bn + Math.min(Ln, wn + yn[3].width), vn + yn[0].width, Ln > wn + yn[3].width ? 0 : En - yn[3].width, Sn - yn[0].width).topRight.subdivide(.5),
        bottomRightOuter: to(bn + Nn, vn + Rn, Tn, In).bottomRight.subdivide(.5),
        bottomRightInner: to(bn + Math.min(Nn, wn - yn[3].width), vn + Math.min(Rn, xn + yn[0].width), Math.max(0, Tn - yn[1].width), In - yn[2].width).bottomRight.subdivide(.5),
        bottomLeftOuter: to(bn, vn + Bn, On, An).bottomLeft.subdivide(.5),
        bottomLeftInner: to(bn + yn[3].width, vn + Bn, Math.max(0, On - yn[3].width), An - yn[2].width).bottomLeft.subdivide(.5)
      }
    }
    function no(mn, gn, yn, bn) {
      var vn = function (wn, xn, kn) {
        return {
          x: wn.x + (xn.x - wn.x) * kn,
          y: wn.y + (xn.y - wn.y) * kn
        }
      };
      return {
        start: mn,
        startControl: gn,
        endControl: yn,
        end: bn,
        subdivide: function (wn) {
          var xn = vn(mn, gn, wn)
            , kn = vn(gn, yn, wn)
            , Cn = vn(yn, bn, wn)
            , En = vn(xn, kn, wn)
            , Sn = vn(kn, Cn, wn)
            , Tn = vn(En, Sn, wn);
          return [no(mn, xn, En, Tn), no(Tn, Sn, Cn, bn)]
        },
        curveTo: function (wn) {
          wn.push(["bezierCurve", gn.x, gn.y, yn.x, yn.y, bn.x, bn.y])
        },
        curveToReversed: function (wn) {
          wn.push(["bezierCurve", yn.x, yn.y, gn.x, gn.y, mn.x, mn.y])
        }
      }
    }
    function ro(mn, gn, yn, bn, vn, wn, xn) {
      var kn = [];
      return 0 < gn[0] || 0 < gn[1] ? (kn.push(["line", bn[1].start.x, bn[1].start.y]),
        bn[1].curveTo(kn)) : kn.push(["line", mn.c1[0], mn.c1[1]]),
        0 < yn[0] || 0 < yn[1] ? (kn.push(["line", wn[0].start.x, wn[0].start.y]),
          wn[0].curveTo(kn),
          kn.push(["line", xn[0].end.x, xn[0].end.y]),
          xn[0].curveToReversed(kn)) : (kn.push(["line", mn.c2[0], mn.c2[1]]),
            kn.push(["line", mn.c3[0], mn.c3[1]])),
        0 < gn[0] || 0 < gn[1] ? (kn.push(["line", vn[1].end.x, vn[1].end.y]),
          vn[1].curveToReversed(kn)) : kn.push(["line", mn.c4[0], mn.c4[1]]),
        kn
    }
    function ao(mn, gn, yn, bn, vn, wn, xn) {
      0 < gn[0] || 0 < gn[1] ? (mn.push(["line", bn[0].start.x, bn[0].start.y]),
        bn[0].curveTo(mn),
        bn[1].curveTo(mn)) : mn.push(["line", wn, xn]),
        (0 < yn[0] || 0 < yn[1]) && mn.push(["line", vn[0].start.x, vn[0].start.y])
    }
    function io(mn) {
      return 0 > mn.cssInt("zIndex")
    }
    function so(mn) {
      return 0 < mn.cssInt("zIndex")
    }
    function lo(mn) {
      return 0 === mn.cssInt("zIndex")
    }
    function co(mn) {
      return -1 !== ["inline", "inline-block", "inline-table"].indexOf(mn.css("display"))
    }
    function po(mn) {
      return mn instanceof zo
    }
    function uo(mn) {
      return 0 < mn.node.data.trim().length
    }
    function ho(mn) {
      return /^(normal|none|0px)$/.test(mn.parent.css("letterSpacing"))
    }
    function mo(mn) {
      return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (gn) {
        var yn = mn.css("border" + gn + "Radius").split(" ");
        return 1 >= yn.length && (yn[1] = yn[0]),
          yn.map(Io)
      })
    }
    function go(mn) {
      return mn.nodeType === Node.TEXT_NODE || mn.nodeType === Node.ELEMENT_NODE
    }
    function fo(mn) {
      var gn = mn.css("position");
      return "auto" !== (-1 === ["absolute", "relative", "fixed"].indexOf(gn) ? "auto" : mn.css("zIndex"))
    }
    function yo(mn) {
      return "static" !== mn.css("position")
    }
    function bo(mn) {
      return "none" !== mn.css("float")
    }
    function vo(mn) {
      return -1 !== ["inline-block", "inline-table"].indexOf(mn.css("display"))
    }
    function wo(mn) {
      var gn = this;
      return function () {
        return !mn.apply(gn, arguments)
      }
    }
    function xo(mn) {
      return mn.node.nodeType === Node.ELEMENT_NODE
    }
    function ko(mn) {
      return !0 === mn.isPseudoElement
    }
    function Co(mn) {
      return mn.node.nodeType === Node.TEXT_NODE
    }
    function Eo(mn) {
      return function (gn, yn) {
        return gn.cssInt("zIndex") + mn.indexOf(gn) / mn.length - (yn.cssInt("zIndex") + mn.indexOf(yn) / mn.length)
      }
    }
    function So(mn) {
      return 1 > mn.getOpacity()
    }
    function To(mn, gn) {
      return function () {
        return mn.apply(gn, arguments)
      }
    }
    function Io(mn) {
      return parseInt(mn, 10)
    }
    function Oo(mn) {
      return mn.width
    }
    function Ao(mn) {
      return mn.node.nodeType !== Node.ELEMENT_NODE || -1 === ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(mn.node.nodeName)
    }
    function Lo(mn) {
      return [].concat.apply([], mn)
    }
    function Ro(mn) {
      var gn = mn.substr(0, 1);
      return gn === mn.substr(mn.length - 1) && gn.match(/'|"/) ? mn.substr(1, mn.length - 2) : mn
    }
    function No(mn) {
      for (var gn, yn = [], bn = 0, vn = !1; mn.length;)
        Bo(mn[bn]) === vn ? ((gn = mn.splice(0, bn)).length && yn.push(ae.html2canvas.punycode.ucs2.encode(gn)),
          vn = !vn,
          bn = 0) : bn++,
          bn >= mn.length && (gn = mn.splice(0, bn)).length && yn.push(ae.html2canvas.punycode.ucs2.encode(gn));
      return yn
    }
    function Bo(mn) {
      return -1 !== [32, 13, 10, 9, 45].indexOf(mn)
    }
    function Do(mn) {
      return /[^\u0000-\u00ff]/.test(mn)
    }
    function Po(mn, gn, yn) {
      if (!gn)
        return Promise.reject("No proxy configured");
      var bn = jo(un)
        , vn = Wo(gn, mn, bn);
      return un ? Ko(vn) : Mo(yn, vn, bn).then(function (wn) {
        return Yo(wn.content)
      })
    }
    function _o(mn, gn, yn) {
      var bn = jo(hn)
        , vn = Wo(gn, mn, bn);
      return hn ? Promise.resolve(vn) : Mo(yn, vn, bn).then(function (wn) {
        return "data:" + wn.type + ";base64," + wn.content
      })
    }
    function Mo(mn, gn, yn) {
      return new Promise(function (bn, vn) {
        var wn = mn.createElement("script")
          , xn = function () {
            delete ae.html2canvas.proxy[yn],
              mn.body.removeChild(wn)
          };
        ae.html2canvas.proxy[yn] = function (kn) {
          xn(),
            bn(kn)
        }
          ,
          wn.src = gn,
          wn.onerror = function (kn) {
            xn(),
              vn(kn)
          }
          ,
          mn.body.appendChild(wn)
      }
      )
    }
    function jo(mn) {
      return mn ? "" : "html2canvas_" + Date.now() + "_" + ++pn + "_" + Math.round(1e5 * Math.random())
    }
    function Wo(mn, gn, yn) {
      return mn + "?url=" + encodeURIComponent(gn) + (yn.length ? "&callback=html2canvas.proxy." + yn : "")
    }
    function Ho(mn, gn) {
      se.createElement("script");
      var yn = se.createElement("a");
      yn.href = mn,
        mn = yn.href,
        this.src = mn,
        this.image = new Image;
      var bn = this;
      this.promise = new Promise(function (vn, wn) {
        bn.image.crossOrigin = "Anonymous",
          bn.image.onload = vn,
          bn.image.onerror = wn,
          new _o(mn, gn, se).then(function (xn) {
            bn.image.src = xn
          }).catch(wn)
      }
      )
    }
    function Fo(mn, gn, yn) {
      Fe.call(this, mn, gn),
        this.isPseudoElement = !0,
        this.before = ":before" === yn
    }
    function Vo(mn, gn, yn, bn, vn) {
      this.width = mn,
        this.height = gn,
        this.images = yn,
        this.options = bn,
        this.document = vn
    }
    function zo(mn, gn, yn, bn) {
      Fe.call(this, yn, bn),
        this.ownStacking = mn,
        this.contexts = [],
        this.children = [],
        this.opacity = (this.parent ? this.parent.stack.opacity : 1) * gn
    }
    function qo(mn) {
      this.rangeBounds = this.testRangeBounds(mn),
        this.cors = this.testCORS(),
        this.svg = this.testSVG()
    }
    function Xo(mn) {
      this.src = mn,
        this.image = null;
      var gn = this;
      this.promise = this.hasFabric().then(function () {
        return gn.isInline(mn) ? Promise.resolve(gn.inlineFormatting(mn)) : Ko(mn)
      }).then(function (yn) {
        return new Promise(function (bn) {
          html2canvas.fabric.loadSVGFromString(yn, gn.createCanvas.call(gn, bn))
        }
        )
      })
    }
    function Yo(mn) {
      var gn, yn, bn, vn, wn, xn, kn, Cn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", En = mn.length, Sn = "";
      for (gn = 0; gn < En; gn += 4)
        wn = Cn.indexOf(mn[gn]) << 2 | (yn = Cn.indexOf(mn[gn + 1])) >> 4,
          xn = (15 & yn) << 4 | (bn = Cn.indexOf(mn[gn + 2])) >> 2,
          kn = (3 & bn) << 6 | (vn = Cn.indexOf(mn[gn + 3])),
          Sn += 64 === bn ? String.fromCharCode(wn) : 64 === vn || -1 === vn ? String.fromCharCode(wn, xn) : String.fromCharCode(wn, xn, kn);
      return Sn
    }
    function Uo(mn, gn) {
      this.src = mn,
        this.image = null;
      var yn = this;
      this.promise = gn ? new Promise(function (bn, vn) {
        yn.image = new Image,
          yn.image.onload = bn,
          yn.image.onerror = vn,
          yn.image.src = "data:image/svg+xml," + new XMLSerializer().serializeToString(mn),
          !0 === yn.image.complete && bn(yn.image)
      }
      ) : this.hasFabric().then(function () {
        return new Promise(function (bn) {
          html2canvas.fabric.parseSVGDocument(mn, yn.createCanvas.call(yn, bn))
        }
        )
      })
    }
    function Go(mn, gn) {
      Fe.call(this, mn, gn)
    }
    function Qo(mn, gn, yn) {
      if (0 < mn.length)
        return gn + yn.toUpperCase()
    }
    function Jo(mn) {
      _e.apply(this, arguments),
        this.type = "linear" === mn.args[0] ? this.TYPES.LINEAR : this.TYPES.RADIAL
    }
    function Ko(mn) {
      return new Promise(function (gn, yn) {
        var bn = new XMLHttpRequest;
        bn.open("GET", mn),
          bn.onload = function () {
            200 === bn.status ? gn(bn.responseText) : yn(new Error(bn.statusText))
          }
          ,
          bn.onerror = function () {
            yn(new Error("Network Error"))
          }
          ,
          bn.send()
      }
      )
    }
    function Zo(mn, gn) {
      Vo.apply(this, arguments),
        this.canvas = this.options.canvas || this.document.createElement("canvas"),
        this.options.canvas || (this.canvas.width = mn,
          this.canvas.height = gn),
        this.ctx = this.canvas.getContext("2d"),
        this.taintCtx = this.document.createElement("canvas").getContext("2d"),
        this.ctx.textBaseline = "bottom",
        this.variables = {},
        He("Initialized CanvasRenderer with size", mn, "x", gn)
    }
    function $o(mn) {
      return 0 < mn.length
    }
    if (function () {
      function mn(zn, qn) {
        jn[Pn] = zn,
          jn[Pn + 1] = qn,
          2 == (Pn += 2) && Bn()
      }
      function gn(zn) {
        return "function" == typeof zn
      }
      function yn() {
        for (var zn = 0; zn < Pn; zn += 2)
          (0,
            jn[zn])(jn[zn + 1]),
            jn[zn] = void 0,
            jn[zn + 1] = void 0;
        Pn = 0
      }
      function bn() {}
      function vn(zn, qn, Xn, Yn) {
        try {
          zn.call(qn, Xn, Yn)
        } catch (Un) {
          return Un
        }
      }
      function wn(zn, qn, Xn) {
        mn(function (Yn) {
          var Un = !1
            , Gn = vn(Xn, qn, function (Qn) {
              Un || (Un = !0,
                qn === Qn ? En(Yn, Qn) : kn(Yn, Qn))
            }, function (Qn) {
              Un || (Un = !0,
                Sn(Yn, Qn))
            });
          !Un && Gn && (Un = !0,
            Sn(Yn, Gn))
        }, zn)
      }
      function xn(zn, qn) {
        1 === qn.a ? En(zn, qn.b) : 2 === zn.a ? Sn(zn, qn.b) : Tn(qn, void 0, function (Xn) {
          kn(zn, Xn)
        }, function (Xn) {
          Sn(zn, Xn)
        })
      }
      function kn(zn, qn) {
        if (zn === qn)
          Sn(zn, new TypeError("You cannot resolve a promise with itself"));
        else if (!("function" == typeof qn || "object" == typeof qn && null !== qn))
          En(zn, qn);
        else if (qn.constructor === zn.constructor)
          xn(zn, qn);
        else {
          var Xn;
          try {
            Xn = qn.then
          } catch (Yn) {
            Wn.error = Yn,
              Xn = Wn
          }
          Xn === Wn ? Sn(zn, Wn.error) : void 0 === Xn ? En(zn, qn) : gn(Xn) ? wn(zn, qn, Xn) : En(zn, qn)
        }
      }
      function Cn(zn) {
        zn.f && zn.f(zn.b),
          In(zn)
      }
      function En(zn, qn) {
        void 0 === zn.a && (zn.b = qn,
          zn.a = 1,
          0 !== zn.e.length && mn(In, zn))
      }
      function Sn(zn, qn) {
        void 0 === zn.a && (zn.a = 2,
          zn.b = qn,
          mn(Cn, zn))
      }
      function Tn(zn, qn, Xn, Yn) {
        var Un = zn.e
          , Gn = Un.length;
        zn.f = null,
          Un[Gn] = qn,
          Un[Gn + 1] = Xn,
          Un[Gn + 2] = Yn,
          0 === Gn && zn.a && mn(In, zn)
      }
      function In(zn) {
        var qn = zn.e
          , Xn = zn.a;
        if (0 !== qn.length) {
          for (var Yn, Un, Gn = zn.b, Qn = 0; Qn < qn.length; Qn += 3)
            Yn = qn[Qn],
              Un = qn[Qn + Xn],
              Yn ? An(Xn, Yn, Un, Gn) : Un(Gn);
          zn.e.length = 0
        }
      }
      function On() {
        this.error = null
      }
      function An(zn, qn, Xn, Yn) {
        var Un, Gn, Qn, Jn, Kn = gn(Xn);
        if (Kn) {
          try {
            Un = Xn(Yn)
          } catch (Zn) {
            Hn.error = Zn,
              Un = Hn
          }
          if (Un === Hn ? (Jn = !0,
            Gn = Un.error,
            Un = null) : Qn = !0,
            qn === Un)
            return void Sn(qn, new TypeError("A promises callback cannot return that same promise."))
        } else
          Un = Yn,
            Qn = !0;
        void 0 === qn.a && (Kn && Qn ? kn(qn, Un) : Jn ? Sn(qn, Gn) : 1 === zn ? En(qn, Un) : 2 == zn && Sn(qn, Un))
      }
      function Ln(zn, qn) {
        try {
          qn(function (Xn) {
            kn(zn, Xn)
          }, function (Xn) {
            Sn(zn, Xn)
          })
        } catch (Xn) {
          Sn(zn, Xn)
        }
      }
      function Rn(zn, qn, Xn, Yn) {
        this.n = zn,
          this.c = new zn(bn, Yn),
          this.i = Xn,
          this.o(qn) ? (this.m = qn,
            this.d = this.length = qn.length,
            this.l(),
            0 === this.length ? En(this.c, this.b) : (this.length = this.length || 0,
              this.k(),
              0 === this.d && En(this.c, this.b))) : Sn(this.c, this.p())
      }
      function Nn(zn) {
        if (Fn++,
          this.b = this.a = void 0,
          this.e = [],
          bn !== zn) {
          if (!gn(zn))
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
          if (!(this instanceof Nn))
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
          Ln(this, zn)
        }
      }
      var Bn, Dn = Array.isArray ? Array.isArray : function (zn) {
        return "[object Array]" === Object.prototype.toString.call(zn)
      }
        , Pn = 0, _n = (Mn = void 0 === ae ? {} : ae).MutationObserver || Mn.WebKitMutationObserver, Mn = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, jn = Array(1e3);
      Bn = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? function () {
        return function () {
          process.nextTick(yn)
        }
      }() : _n ? function () {
        var zn = 0
          , qn = new _n(yn)
          , Xn = se.createTextNode("");
        return qn.observe(Xn, {
          characterData: !0
        }),
          function () {
            Xn.data = zn = ++zn % 2
          }
      }() : Mn ? function () {
        var zn = new MessageChannel;
        return zn.port1.onmessage = yn,
          function () {
            zn.port2.postMessage(0)
          }
      }() : function () {
        return function () {
          setTimeout(yn, 1)
        }
      }();
      var Wn = new On
        , Hn = new On;
      Rn.prototype.o = function (zn) {
        return Dn(zn)
      }
        ,
        Rn.prototype.p = function () {
          return Error("Array Methods must be provided an Array")
        }
        ,
        Rn.prototype.l = function () {
          this.b = Array(this.length)
        }
        ,
        Rn.prototype.k = function () {
          for (var zn = this.length, qn = this.c, Xn = this.m, Yn = 0; void 0 === qn.a && Yn < zn; Yn++)
            this.j(Xn[Yn], Yn)
        }
        ,
        Rn.prototype.j = function (zn, qn) {
          var Xn = this.n;
          "object" == typeof zn && null !== zn ? zn.constructor === Xn && void 0 !== zn.a ? (zn.f = null,
            this.g(zn.a, qn, zn.b)) : this.q(Xn.resolve(zn), qn) : (this.d--,
              this.b[qn] = this.h(zn))
        }
        ,
        Rn.prototype.g = function (zn, qn, Xn) {
          var Yn = this.c;
          void 0 === Yn.a && (this.d--,
            this.i && 2 === zn ? Sn(Yn, Xn) : this.b[qn] = this.h(Xn)),
            0 === this.d && En(Yn, this.b)
        }
        ,
        Rn.prototype.h = function (zn) {
          return zn
        }
        ,
        Rn.prototype.q = function (zn, qn) {
          var Xn = this;
          Tn(zn, void 0, function (Yn) {
            Xn.g(1, qn, Yn)
          }, function (Yn) {
            Xn.g(2, qn, Yn)
          })
        }
        ;
      var Fn = 0;
      Nn.all = function (zn, qn) {
        return new Rn(this, zn, !0, qn).c
      }
        ,
        Nn.race = function (zn, qn) {
          function Xn(Jn) {
            kn(Un, Jn)
          }
          function Yn(Jn) {
            Sn(Un, Jn)
          }
          var Un = new this(bn, qn);
          if (!Dn(zn))
            return Sn(Un, new TypeError("You must pass an array to race.")),
              Un;
          for (var Gn = zn.length, Qn = 0; void 0 === Un.a && Qn < Gn; Qn++)
            Tn(this.resolve(zn[Qn]), void 0, Xn, Yn);
          return Un
        }
        ,
        Nn.resolve = function (zn, qn) {
          if (zn && "object" == typeof zn && zn.constructor === this)
            return zn;
          var Xn = new this(bn, qn);
          return kn(Xn, zn),
            Xn
        }
        ,
        Nn.reject = function (zn, qn) {
          var Xn = new this(bn, qn);
          return Sn(Xn, zn),
            Xn
        }
        ,
        Nn.prototype = {
          constructor: Nn,
          then: function (zn, qn) {
            var Xn = this.a;
            if (1 === Xn && !zn || 2 === Xn && !qn)
              return this;
            var Yn = new this.constructor(bn)
              , Un = this.b;
            if (Xn) {
              var Gn = arguments[Xn - 1];
              mn(function () {
                An(Xn, Yn, Gn, Un)
              })
            } else
              Tn(this, Yn, zn, qn);
            return Yn
          },
          catch: function (zn) {
            return this.then(null, zn)
          }
        };
      var Vn = {
        Promise: Nn,
        polyfill: function () {
          var zn;
          "Promise" in (zn = void 0 === de ? void 0 !== ae && ae.document ? ae : self : de) && "resolve" in zn.Promise && "reject" in zn.Promise && "all" in zn.Promise && "race" in zn.Promise && function () {
            var qn;
            return new zn.Promise(function (Xn) {
              qn = Xn
            }
            ),
              gn(qn)
          }() || (zn.Promise = Nn)
        }
      };
      "function" == typeof ce && ce.amd ? ce(function () {
        return Vn
      }) : "undefined" != typeof module && module.exports ? module.exports = Vn : void 0 !== this && (this.ES6Promise = Vn)
    }
      .call(ae),
      ae && ae.ES6Promise.polyfill(),
      void 0 !== se && "function" == typeof Object.create && "function" == typeof se.createElement("canvas").getContext) {
      !function (mn) {
        function gn(Qn) {
          throw RangeError(Xn[Qn])
        }
        function yn(Qn, Jn) {
          for (var Kn = Qn.length, Zn = []; Kn--;)
            Zn[Kn] = Jn(Qn[Kn]);
          return Zn
        }
        function bn(Qn, Jn) {
          var Kn = Qn.split("@")
            , Zn = "";
          return 1 < Kn.length && (Zn = Kn[0] + "@",
            Qn = Kn[1]),
            Zn + yn(Qn.split(qn), Jn).join(".")
        }
        function vn(Qn) {
          for (var Jn, Kn, Zn = [], $n = 0, er = Qn.length; $n < er;)
            55296 <= (Jn = Qn.charCodeAt($n++)) && 56319 >= Jn && $n < er ? 56320 == (64512 & (Kn = Qn.charCodeAt($n++))) ? Zn.push(((1023 & Jn) << 10) + (1023 & Kn) + 65536) : (Zn.push(Jn),
              $n--) : Zn.push(Jn);
          return Zn
        }
        function wn(Qn) {
          return yn(Qn, function (Jn) {
            var Kn = "";
            return 65535 < Jn && (Kn += Gn(55296 | 1023 & (Jn -= 65536) >>> 10),
              Jn = 56320 | 1023 & Jn),
              Kn += Gn(Jn)
          }).join("")
        }
        function xn(Qn) {
          return 10 > Qn - 48 ? Qn - 22 : 26 > Qn - 65 ? Qn - 65 : 26 > Qn - 97 ? Qn - 97 : Dn
        }
        function kn(Qn, Jn) {
          return Qn + 22 + 75 * (26 > Qn) - ((0 != Jn) << 5)
        }
        function Cn(Qn, Jn, Kn) {
          var Zn = 0;
          for (Qn = Kn ? Un(Qn / 700) : Qn >> 1,
            Qn += Un(Qn / Jn); Qn > Yn * _n >> 1; Zn += Dn)
            Qn = Un(Qn / Yn);
          return Un(Zn + (Yn + 1) * Qn / (Qn + 38))
        }
        function En(Qn) {
          var Jn, Kn, Zn, $n, er, tr, or, nr, rr, ar, ir = [], sr = Qn.length, lr = 0, dr = Hn, cr = Wn;
          for (0 > (Kn = Qn.lastIndexOf(Fn)) && (Kn = 0),
            Zn = 0; Zn < Kn; ++Zn)
            128 <= Qn.charCodeAt(Zn) && gn("not-basic"),
              ir.push(Qn.charCodeAt(Zn));
          for ($n = 0 < Kn ? Kn + 1 : 0; $n < sr;) {
            for (er = lr,
              tr = 1,
              or = Dn; $n >= sr && gn("invalid-input"),
              ((nr = xn(Qn.charCodeAt($n++))) >= Dn || nr > Un((Bn - lr) / tr)) && gn("overflow"),
              lr += nr * tr,
              rr = or <= cr ? Pn : or >= cr + _n ? _n : or - cr,
              !(nr < rr); or += Dn)
              tr > Un(Bn / (ar = Dn - rr)) && gn("overflow"),
                tr *= ar;
            cr = Cn(lr - er, Jn = ir.length + 1, 0 == er),
              Un(lr / Jn) > Bn - dr && gn("overflow"),
              dr += Un(lr / Jn),
              lr %= Jn,
              ir.splice(lr++, 0, dr)
          }
          return wn(ir)
        }
        function Sn(Qn) {
          var Jn, Kn, Zn, $n, er, tr, or, nr, rr, ar, ir, sr, lr, dr, cr, pr = [];
          for (sr = (Qn = vn(Qn)).length,
            Jn = Hn,
            Kn = 0,
            er = Wn,
            tr = 0; tr < sr; ++tr)
            128 > (ir = Qn[tr]) && pr.push(Gn(ir));
          for (Zn = $n = pr.length,
            $n && pr.push(Fn); Zn < sr;) {
            for (or = Bn,
              tr = 0; tr < sr; ++tr)
              (ir = Qn[tr]) >= Jn && ir < or && (or = ir);
            for (or - Jn > Un((Bn - Kn) / (lr = Zn + 1)) && gn("overflow"),
              Kn += (or - Jn) * lr,
              Jn = or,
              tr = 0; tr < sr; ++tr)
              if ((ir = Qn[tr]) < Jn && ++Kn > Bn && gn("overflow"),
                ir == Jn) {
                for (nr = Kn,
                  rr = Dn; ar = rr <= er ? Pn : rr >= er + _n ? _n : rr - er,
                  !(nr < ar); rr += Dn)
                  cr = nr - ar,
                    dr = Dn - ar,
                    pr.push(Gn(kn(ar + cr % dr, 0))),
                    nr = Un(cr / dr);
                pr.push(Gn(kn(nr, 0))),
                  er = Cn(Kn, lr, Zn == $n),
                  Kn = 0,
                  ++Zn
              }
            ++Kn,
              ++Jn
          }
          return pr.join("")
        }
        var On = "object" == typeof le && le && !le.nodeType && le
          , An = "object" == typeof module && module && !module.nodeType && module
          , Ln = "object" == typeof de && de;
        Ln.global !== Ln && Ln.window !== Ln && Ln.self !== Ln || (mn = Ln);
        var Rn, Nn, Bn = 2147483647, Dn = 36, Pn = 1, _n = 26, Wn = 72, Hn = 128, Fn = "-", Vn = /^xn--/, zn = /[^\x20-\x7E]/, qn = /[\x2E\u3002\uFF0E\uFF61]/g, Xn = {
          overflow: "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input"
        }, Yn = Dn - Pn, Un = Math.floor, Gn = String.fromCharCode;
        if (Rn = {
          version: "1.3.1",
          ucs2: {
            decode: vn,
            encode: wn
          },
          decode: En,
          encode: Sn,
          toASCII: function (Qn) {
            return bn(Qn, function (Jn) {
              return zn.test(Jn) ? "xn--" + Sn(Jn) : Jn
            })
          },
          toUnicode: function (Qn) {
            return bn(Qn, function (Jn) {
              return Vn.test(Jn) ? En(Jn.slice(4).toLowerCase()) : Jn
            })
          }
        },
          "function" == typeof ce && "object" == typeof ce.amd && ce.amd)
          ce("punycode", function () {
            return Rn
          });
        else if (!(On && An))
          mn.punycode = Rn;
        else if (module.exports == On)
          An.exports = Rn;
        else
          for (Nn in Rn)
            Rn.hasOwnProperty(Nn) && (On[Nn] = Rn[Nn])
      }(this);
      var en = "data-html2canvas-node"
        , tn = "data-html2canvas-canvas-clone"
        , on = 0
        , nn = 0;
      ae.html2canvas = function (mn, gn) {
        var yn = nn++;
        if ((gn = gn || {}).logging && (ae.html2canvas.logging = !0,
          ae.html2canvas.start = Date.now()),
          gn.async = void 0 === gn.async || gn.async,
          gn.allowTaint = void 0 !== gn.allowTaint && gn.allowTaint,
          gn.removeContainer = void 0 === gn.removeContainer || gn.removeContainer,
          gn.javascriptEnabled = void 0 !== gn.javascriptEnabled && gn.javascriptEnabled,
          gn.imageTimeout = void 0 === gn.imageTimeout ? 1e4 : gn.imageTimeout,
          gn.renderer = "function" == typeof gn.renderer ? gn.renderer : Zo,
          gn.strict = !!gn.strict,
          "string" == typeof mn) {
          if ("string" != typeof gn.proxy)
            return Promise.reject("Proxy must be used when rendering url");
          var bn = null == gn.width ? ae.innerWidth : gn.width
            , vn = null == gn.height ? ae.innerHeight : gn.height;
          return Ee(Le(mn), gn.proxy, se, bn, vn, gn).then(function (xn) {
            return he(xn.contentWindow.document.documentElement, xn, gn, bn, vn)
          })
        }
        var wn = (mn === pe ? [se.documentElement] : mn.length ? mn : [mn])[0];
        return wn.setAttribute(en + yn, yn),
          ue(wn.ownerDocument, gn, wn.ownerDocument.defaultView.innerWidth, wn.ownerDocument.defaultView.innerHeight, yn).then(function (xn) {
            return "function" == typeof gn.onrendered && (He("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"),
              gn.onrendered(xn)),
              xn
          })
      }
        ,
        ae.html2canvas.punycode = this.punycode,
        ae.html2canvas.proxy = {},
        Re.prototype.darken = function (mn) {
          var gn = 1 - mn;
          return new Re([Math.round(this.r * gn), Math.round(this.g * gn), Math.round(this.b * gn), this.a])
        }
        ,
        Re.prototype.isTransparent = function () {
          return 0 === this.a
        }
        ,
        Re.prototype.isBlack = function () {
          return 0 === this.r && 0 === this.g && 0 === this.b
        }
        ,
        Re.prototype.fromArray = function (mn) {
          return Array.isArray(mn) && (this.r = Math.min(mn[0], 255),
            this.g = Math.min(mn[1], 255),
            this.b = Math.min(mn[2], 255),
            3 < mn.length && (this.a = mn[3])),
            Array.isArray(mn)
        }
        ;
      var rn = /^#([a-f0-9]{3})$/i;
      Re.prototype.hex3 = function (mn) {
        var gn = null;
        return null !== (gn = mn.match(rn)) && (this.r = parseInt(gn[1][0] + gn[1][0], 16),
          this.g = parseInt(gn[1][1] + gn[1][1], 16),
          this.b = parseInt(gn[1][2] + gn[1][2], 16)),
          null !== gn
      }
        ;
      var an = /^#([a-f0-9]{6})$/i;
      Re.prototype.hex6 = function (mn) {
        var gn = null;
        return null !== (gn = mn.match(an)) && (this.r = parseInt(gn[1].substring(0, 2), 16),
          this.g = parseInt(gn[1].substring(2, 4), 16),
          this.b = parseInt(gn[1].substring(4, 6), 16)),
          null !== gn
      }
        ;
      var sn = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;
      Re.prototype.rgb = function (mn) {
        var gn = null;
        return null !== (gn = mn.match(sn)) && (this.r = +gn[1],
          this.g = +gn[2],
          this.b = +gn[3]),
          null !== gn
      }
        ;
      var ln = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;
      Re.prototype.rgba = function (mn) {
        var gn = null;
        return null !== (gn = mn.match(ln)) && (this.r = +gn[1],
          this.g = +gn[2],
          this.b = +gn[3],
          this.a = +gn[4]),
          null !== gn
      }
        ,
        Re.prototype.toString = function () {
          return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")"
        }
        ,
        Re.prototype.namedColor = function (mn) {
          var gn = dn[mn.toLowerCase()];
          if (gn)
            this.r = gn[0],
              this.g = gn[1],
              this.b = gn[2];
          else if ("transparent" === mn.toLowerCase())
            return this.r = this.g = this.b = this.a = 0,
              !0;
          return !!gn
        }
        ,
        Re.prototype.isColor = !0;
      var dn = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
      };
      De.prototype.getMetrics = function (mn, gn) {
        return this.data[mn + "-" + gn] === pe && (this.data[mn + "-" + gn] = new Be(mn, gn)),
          this.data[mn + "-" + gn]
      }
        ,
        Pe.prototype.proxyLoad = function (mn, gn, yn) {
          var bn = this.src;
          return Ee(bn.src, mn, bn.ownerDocument, gn.width, gn.height, yn)
        }
        ,
        _e.prototype.TYPES = {
          LINEAR: 1,
          RADIAL: 2
        },
        je.prototype.findImages = function (mn) {
          var gn = [];
          return mn.reduce(function (yn, bn) {
            switch (bn.node.nodeName) {
              case "IMG":
                return yn.concat([{
                  args: [bn.node.src],
                  method: "url"
                }]);
              case "svg":
              case "IFRAME":
                return yn.concat([{
                  args: [bn.node],
                  method: bn.node.nodeName
                }]);
            }
            return yn
          }, []).forEach(this.addImage(gn, this.loadImage), this),
            gn
        }
        ,
        je.prototype.findBackgroundImage = function (mn, gn) {
          return gn.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(mn, this.loadImage), this),
            mn
        }
        ,
        je.prototype.addImage = function (mn, gn) {
          return function (yn) {
            yn.args.forEach(function (bn) {
              this.imageExists(mn, bn) || (mn.splice(0, 0, gn.call(this, yn)),
                He("Added image #" + mn.length, "string" == typeof bn ? bn.substring(0, 100) : bn))
            }, this)
          }
        }
        ,
        je.prototype.hasImageBackground = function (mn) {
          return "none" !== mn.method
        }
        ,
        je.prototype.loadImage = function (mn) {
          if ("url" === mn.method) {
            var gn = mn.args[0];
            return !this.isSVG(gn) || this.support.svg || this.options.allowTaint ? gn.match(/data:image\/.*;base64,/i) ? new Me(gn.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1) : this.isSameOrigin(gn) || !0 === this.options.allowTaint || this.isSVG(gn) ? new Me(gn, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new Me(gn, !0) : this.options.proxy ? new Ho(gn, this.options.proxy) : new Ne(gn) : new Xo(gn)
          }
          return "linear-gradient" === mn.method ? new We(mn) : "gradient" === mn.method ? new Jo(mn) : "svg" === mn.method ? new Uo(mn.args[0], this.support.svg) : "IFRAME" === mn.method ? new Pe(mn.args[0], this.isSameOrigin(mn.args[0].src), this.options) : new Ne(mn)
        }
        ,
        je.prototype.isSVG = function (mn) {
          return "svg" === mn.substring(mn.length - 3).toLowerCase() || Xo.prototype.isInline(mn)
        }
        ,
        je.prototype.imageExists = function (mn, gn) {
          return mn.some(function (yn) {
            return yn.src === gn
          })
        }
        ,
        je.prototype.isSameOrigin = function (mn) {
          return this.getOrigin(mn) === this.origin
        }
        ,
        je.prototype.getOrigin = function (mn) {
          var gn = this.link || (this.link = se.createElement("a"));
          return gn.href = mn,
            gn.href = gn.href,
            gn.protocol + gn.hostname + gn.port
        }
        ,
        je.prototype.getPromise = function (mn) {
          return this.timeout(mn, this.options.imageTimeout).catch(function () {
            return new Ne(mn.src).promise.then(function (gn) {
              mn.image = gn
            })
          })
        }
        ,
        je.prototype.get = function (mn) {
          var gn = null;
          return this.images.some(function (yn) {
            return (gn = yn).src === mn
          }) ? gn : null
        }
        ,
        je.prototype.fetch = function (mn) {
          return this.images = mn.reduce(To(this.findBackgroundImage, this), this.findImages(mn)),
            this.images.forEach(function (gn, yn) {
              gn.promise.then(function () {
                He("Succesfully loaded image #" + (yn + 1), gn)
              }, function (bn) {
                He("Failed loading image #" + (yn + 1), gn, bn)
              })
            }),
            this.ready = Promise.all(this.images.map(this.getPromise, this)),
            He("Finished searching images"),
            this
        }
        ,
        je.prototype.timeout = function (mn, gn) {
          var yn, bn = Promise.race([mn.promise, new Promise(function (vn, wn) {
            yn = setTimeout(function () {
              He("Timed out loading image", mn),
                wn(mn)
            }, gn)
          }
          )]).then(function (vn) {
            return clearTimeout(yn),
              vn
          });
          return bn.catch(function () {
            clearTimeout(yn)
          }),
            bn
        }
        ,
        We.prototype = Object.create(_e.prototype),
        We.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/,
        Fe.prototype.cloneTo = function (mn) {
          mn.visible = this.visible,
            mn.borders = this.borders,
            mn.bounds = this.bounds,
            mn.clip = this.clip,
            mn.backgroundClip = this.backgroundClip,
            mn.computedStyles = this.computedStyles,
            mn.styles = this.styles,
            mn.backgroundImages = this.backgroundImages,
            mn.opacity = this.opacity
        }
        ,
        Fe.prototype.getOpacity = function () {
          return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity
        }
        ,
        Fe.prototype.assignStack = function (mn) {
          this.stack = mn,
            mn.children.push(this)
        }
        ,
        Fe.prototype.isElementVisible = function () {
          return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
        }
        ,
        Fe.prototype.css = function (mn) {
          return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)),
            this.styles[mn] || (this.styles[mn] = this.computedStyles[mn])
        }
        ,
        Fe.prototype.prefixedCss = function (mn) {
          var yn = this.css(mn);
          return yn === pe && ["webkit", "moz", "ms", "o"].some(function (bn) {
            return (yn = this.css(bn + mn.substr(0, 1).toUpperCase() + mn.substr(1))) !== pe
          }, this),
            yn === pe ? null : yn
        }
        ,
        Fe.prototype.computedStyle = function (mn) {
          return this.node.ownerDocument.defaultView.getComputedStyle(this.node, mn)
        }
        ,
        Fe.prototype.cssInt = function (mn) {
          var gn = parseInt(this.css(mn), 10);
          return isNaN(gn) ? 0 : gn
        }
        ,
        Fe.prototype.color = function (mn) {
          return this.colors[mn] || (this.colors[mn] = new Re(this.css(mn)))
        }
        ,
        Fe.prototype.cssFloat = function (mn) {
          var gn = parseFloat(this.css(mn));
          return isNaN(gn) ? 0 : gn
        }
        ,
        Fe.prototype.fontWeight = function () {
          var mn = this.css("fontWeight");
          switch (parseInt(mn, 10)) {
            case 401:
              mn = "bold";
              break;
            case 400:
              mn = "normal";
          }
          return mn
        }
        ,
        Fe.prototype.parseClip = function () {
          var mn = this.css("clip").match(this.CLIP);
          return mn ? {
            top: parseInt(mn[1], 10),
            right: parseInt(mn[2], 10),
            bottom: parseInt(mn[3], 10),
            left: parseInt(mn[4], 10)
          } : null
        }
        ,
        Fe.prototype.parseBackgroundImages = function () {
          return this.backgroundImages || (this.backgroundImages = Xe(this.css("backgroundImage")))
        }
        ,
        Fe.prototype.cssList = function (mn, gn) {
          var yn = (this.css(mn) || "").split(",");
          return yn = yn[gn || 0] || yn[0] || "auto",
            1 === (yn = yn.trim().split(" ")).length && (yn = [yn[0], yn[0]]),
            yn
        }
        ,
        Fe.prototype.parseBackgroundSize = function (mn, gn, yn) {
          var bn, vn, wn = this.cssList("backgroundSize", yn);
          if (qe(wn[0]))
            bn = mn.width * parseFloat(wn[0]) / 100;
          else {
            if (/contain|cover/.test(wn[0])) {
              var xn = mn.width / mn.height
                , kn = gn.width / gn.height;
              return xn < kn ^ "contain" === wn[0] ? {
                width: mn.height * kn,
                height: mn.height
              } : {
                width: mn.width,
                height: mn.width / kn
              }
            }
            bn = parseInt(wn[0], 10)
          }
          return vn = "auto" === wn[0] && "auto" === wn[1] ? gn.height : "auto" === wn[1] ? bn / gn.width * gn.height : qe(wn[1]) ? mn.height * parseFloat(wn[1]) / 100 : parseInt(wn[1], 10),
            "auto" === wn[0] && (bn = vn / gn.height * gn.width),
          {
            width: bn,
            height: vn
          }
        }
        ,
        Fe.prototype.parseBackgroundPosition = function (mn, gn, yn, bn) {
          var vn, wn, xn = this.cssList("backgroundPosition", yn);
          return vn = qe(xn[0]) ? (mn.width - (bn || gn).width) * (parseFloat(xn[0]) / 100) : parseInt(xn[0], 10),
            wn = "auto" === xn[1] ? vn / gn.width * gn.height : qe(xn[1]) ? (mn.height - (bn || gn).height) * parseFloat(xn[1]) / 100 : parseInt(xn[1], 10),
            "auto" === xn[0] && (vn = wn / gn.height * gn.width),
          {
            left: vn,
            top: wn
          }
        }
        ,
        Fe.prototype.parseBackgroundRepeat = function (mn) {
          return this.cssList("backgroundRepeat", mn)[0]
        }
        ,
        Fe.prototype.parseTextShadows = function () {
          var mn = this.css("textShadow")
            , gn = [];
          if (mn && "none" !== mn)
            for (var vn, yn = mn.match(this.TEXT_SHADOW_PROPERTY), bn = 0; yn && bn < yn.length; bn++)
              vn = yn[bn].match(this.TEXT_SHADOW_VALUES),
                gn.push({
                  color: new Re(vn[0]),
                  offsetX: vn[1] ? parseFloat(vn[1].replace("px", "")) : 0,
                  offsetY: vn[2] ? parseFloat(vn[2].replace("px", "")) : 0,
                  blur: vn[3] ? vn[3].replace("px", "") : 0
                });
          return gn
        }
        ,
        Fe.prototype.parseTransform = function () {
          if (!this.transformData)
            if (this.hasTransform()) {
              var mn = this.parseBounds()
                , gn = this.prefixedCss("transformOrigin").split(" ").map(Ye).map(Ue);
              gn[0] += mn.left,
                gn[1] += mn.top,
                this.transformData = {
                  origin: gn,
                  matrix: this.parseTransformMatrix()
                }
            } else
              this.transformData = {
                origin: [0, 0],
                matrix: [1, 0, 0, 1, 0, 0]
              };
          return this.transformData
        }
        ,
        Fe.prototype.parseTransformMatrix = function () {
          if (!this.transformMatrix) {
            var mn = this.prefixedCss("transform")
              , gn = mn ? ze(mn.match(this.MATRIX_PROPERTY)) : null;
            this.transformMatrix = gn || [1, 0, 0, 1, 0, 0]
          }
          return this.transformMatrix
        }
        ,
        Fe.prototype.parseBounds = function () {
          return this.bounds || (this.bounds = this.hasTransform() ? Qe(this.node) : Ge(this.node))
        }
        ,
        Fe.prototype.hasTransform = function () {
          return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform()
        }
        ,
        Fe.prototype.getValue = function () {
          var mn = this.node.value || "";
          return "SELECT" === this.node.tagName ? mn = Ve(this.node) : "password" === this.node.type && (mn = Array(mn.length + 1).join("\u2022")),
            0 === mn.length ? this.node.placeholder || "" : mn
        }
        ,
        Fe.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/,
        Fe.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,
        Fe.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g,
        Fe.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/,
        Je.prototype.calculateOverflowClips = function () {
          this.nodes.forEach(function (mn) {
            if (xo(mn)) {
              ko(mn) && mn.appendToDOM(),
                mn.borders = this.parseBorders(mn);
              var gn = "hidden" === mn.css("overflow") ? [mn.borders.clip] : []
                , yn = mn.parseClip();
              yn && -1 !== ["absolute", "fixed"].indexOf(mn.css("position")) && gn.push([["rect", mn.bounds.left + yn.left, mn.bounds.top + yn.top, yn.right - yn.left, yn.bottom - yn.top]]),
                mn.clip = Ke(mn) ? mn.parent.clip.concat(gn) : gn,
                mn.backgroundClip = "hidden" === mn.css("overflow") ? mn.clip : mn.clip.concat([mn.borders.clip]),
                ko(mn) && mn.cleanDOM()
            } else
              Co(mn) && (mn.clip = Ke(mn) ? mn.parent.clip : []);
            ko(mn) || (mn.bounds = null)
          }, this)
        }
        ,
        Je.prototype.asyncRenderer = function (mn, gn, yn) {
          yn = yn || Date.now(),
            this.paint(mn[this.renderIndex++]),
            mn.length === this.renderIndex ? gn() : yn + 20 > Date.now() ? this.asyncRenderer(mn, gn, yn) : setTimeout(To(function () {
              this.asyncRenderer(mn, gn)
            }, this), 0)
        }
        ,
        Je.prototype.createPseudoHideStyles = function (mn) {
          this.createStyles(mn, "." + Fo.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ":before { content: \"\" !important; display: none !important; }." + Fo.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ":after { content: \"\" !important; display: none !important; }")
        }
        ,
        Je.prototype.disableAnimations = function (mn) {
          this.createStyles(mn, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
        }
        ,
        Je.prototype.createStyles = function (mn, gn) {
          var yn = mn.createElement("style");
          yn.innerHTML = gn,
            mn.body.appendChild(yn)
        }
        ,
        Je.prototype.getPseudoElements = function (mn) {
          var gn = [[mn]];
          if (mn.node.nodeType === Node.ELEMENT_NODE) {
            var yn = this.getPseudoElement(mn, ":before")
              , bn = this.getPseudoElement(mn, ":after");
            yn && gn.push(yn),
              bn && gn.push(bn)
          }
          return Lo(gn)
        }
        ,
        Je.prototype.getPseudoElement = function (mn, gn) {
          var yn = mn.computedStyle(gn);
          if (!yn || !yn.content || "none" === yn.content || "-moz-alt-content" === yn.content || "none" === yn.display)
            return null;
          for (var Cn, bn = Ro(yn.content), vn = "url" === bn.substr(0, 3), wn = se.createElement(vn ? "img" : "html2canvaspseudoelement"), xn = new Fo(wn, mn, gn), kn = yn.length - 1; 0 <= kn; kn--)
            Cn = Ze(yn.item(kn)),
              wn.style[Cn] = yn[Cn];
          if (wn.className = Fo.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + Fo.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER,
            vn)
            return wn.src = Xe(bn)[0].args[0],
              [xn];
          var En = se.createTextNode(bn);
          return wn.appendChild(En),
            [xn, new Go(En, xn)]
        }
        ,
        Je.prototype.getChildren = function (mn) {
          return Lo([].filter.call(mn.node.childNodes, go).map(function (gn) {
            var yn = [gn.nodeType === Node.TEXT_NODE ? new Go(gn, mn) : new Fe(gn, mn)].filter(Ao);
            return gn.nodeType === Node.ELEMENT_NODE && yn.length && "TEXTAREA" !== gn.tagName ? yn[0].isElementVisible() ? yn.concat(this.getChildren(yn[0])) : [] : yn
          }, this))
        }
        ,
        Je.prototype.newStackingContext = function (mn, gn) {
          var yn = new zo(gn, mn.getOpacity(), mn.node, mn.parent);
          mn.cloneTo(yn),
            (gn ? yn.getParentStack(this) : yn.parent.stack).contexts.push(yn),
            mn.stack = yn
        }
        ,
        Je.prototype.createStackingContexts = function () {
          this.nodes.forEach(function (mn) {
            xo(mn) && (this.isRootElement(mn) || So(mn) || fo(mn) || this.isBodyWithTransparentRoot(mn) || mn.hasTransform()) ? this.newStackingContext(mn, !0) : xo(mn) && (yo(mn) && lo(mn) || vo(mn) || bo(mn)) ? this.newStackingContext(mn, !1) : mn.assignStack(mn.parent.stack)
          }, this)
        }
        ,
        Je.prototype.isBodyWithTransparentRoot = function (mn) {
          return "BODY" === mn.node.nodeName && mn.parent.color("backgroundColor").isTransparent()
        }
        ,
        Je.prototype.isRootElement = function (mn) {
          return null === mn.parent
        }
        ,
        Je.prototype.sortStackingContexts = function (mn) {
          mn.contexts.sort(Eo(mn.contexts.slice(0))),
            mn.contexts.forEach(this.sortStackingContexts, this)
        }
        ,
        Je.prototype.parseTextBounds = function (mn) {
          return function (gn, yn, bn) {
            if ("none" !== mn.parent.css("textDecoration").substr(0, 4) || 0 !== gn.trim().length) {
              if (this.support.rangeBounds && !mn.parent.hasTransform()) {
                var vn = bn.slice(0, yn).join("").length;
                return this.getRangeBounds(mn.node, vn, gn.length)
              }
              if (mn.node && "string" == typeof mn.node.data) {
                var wn = mn.node.splitText(gn.length)
                  , xn = this.getWrapperBounds(mn.node, mn.parent.hasTransform());
                return mn.node = wn,
                  xn
              }
            } else
              this.support.rangeBounds && !mn.parent.hasTransform() || (mn.node = mn.node.splitText(gn.length));
            return {}
          }
        }
        ,
        Je.prototype.getWrapperBounds = function (mn, gn) {
          var yn = mn.ownerDocument.createElement("html2canvaswrapper")
            , bn = mn.parentNode
            , vn = mn.cloneNode(!0);
          yn.appendChild(mn.cloneNode(!0)),
            bn.replaceChild(yn, mn);
          var wn = gn ? Qe(yn) : Ge(yn);
          return bn.replaceChild(vn, yn),
            wn
        }
        ,
        Je.prototype.getRangeBounds = function (mn, gn, yn) {
          var bn = this.range || (this.range = mn.ownerDocument.createRange());
          return bn.setStart(mn, gn),
            bn.setEnd(mn, gn + yn),
            bn.getBoundingClientRect()
        }
        ,
        Je.prototype.parse = function (mn) {
          var gn = mn.contexts.filter(io)
            , yn = mn.children.filter(xo)
            , bn = yn.filter(wo(bo))
            , vn = bn.filter(wo(yo)).filter(wo(co))
            , wn = yn.filter(wo(yo)).filter(bo)
            , xn = bn.filter(wo(yo)).filter(co)
            , kn = mn.contexts.concat(bn.filter(yo)).filter(lo)
            , Cn = mn.children.filter(Co).filter(uo)
            , En = mn.contexts.filter(so);
          gn.concat(vn).concat(wn).concat(xn).concat(kn).concat(Cn).concat(En).forEach(function (Sn) {
            this.renderQueue.push(Sn),
              po(Sn) && (this.parse(Sn),
                this.renderQueue.push(new $e))
          }, this)
        }
        ,
        Je.prototype.paint = function (mn) {
          try {
            mn instanceof $e ? this.renderer.ctx.restore() : Co(mn) ? (ko(mn.parent) && mn.parent.appendToDOM(),
              this.paintText(mn),
              ko(mn.parent) && mn.parent.cleanDOM()) : this.paintNode(mn)
          } catch (gn) {
            if (He(gn),
              this.options.strict)
              throw gn
          }
        }
        ,
        Je.prototype.paintNode = function (mn) {
          po(mn) && (this.renderer.setOpacity(mn.opacity),
            this.renderer.ctx.save(),
            mn.hasTransform() && this.renderer.setTransform(mn.parseTransform())),
            "INPUT" === mn.node.nodeName && "checkbox" === mn.node.type ? this.paintCheckbox(mn) : "INPUT" === mn.node.nodeName && "radio" === mn.node.type ? this.paintRadio(mn) : this.paintElement(mn)
        }
        ,
        Je.prototype.paintElement = function (mn) {
          var gn = mn.parseBounds();
          this.renderer.clip(mn.backgroundClip, function () {
            this.renderer.renderBackground(mn, gn, mn.borders.borders.map(Oo))
          }, this),
            this.renderer.clip(mn.clip, function () {
              this.renderer.renderBorders(mn.borders.borders)
            }, this),
            this.renderer.clip(mn.backgroundClip, function () {
              switch (mn.node.nodeName) {
                case "svg":
                case "IFRAME":
                  var yn = this.images.get(mn.node);
                  yn ? this.renderer.renderImage(mn, gn, mn.borders, yn) : He("Error loading <" + mn.node.nodeName + ">", mn.node);
                  break;
                case "IMG":
                  var bn = this.images.get(mn.node.src);
                  bn ? this.renderer.renderImage(mn, gn, mn.borders, bn) : He("Error loading <img>", mn.node.src);
                  break;
                case "CANVAS":
                  this.renderer.renderImage(mn, gn, mn.borders, {
                    image: mn.node
                  });
                  break;
                case "SELECT":
                case "INPUT":
                case "TEXTAREA":
                  this.paintFormValue(mn);
              }
            }, this)
        }
        ,
        Je.prototype.paintCheckbox = function (mn) {
          var gn = mn.parseBounds()
            , yn = Math.min(gn.width, gn.height)
            , bn = {
              width: yn - 1,
              height: yn - 1,
              top: gn.top,
              left: gn.left
            }
            , vn = [3, 3]
            , wn = [vn, vn, vn, vn]
            , xn = [1, 1, 1, 1].map(function (Cn) {
              return {
                color: new Re("#A5A5A5"),
                width: Cn
              }
            })
            , kn = oo(bn, wn, xn);
          this.renderer.clip(mn.backgroundClip, function () {
            this.renderer.rectangle(bn.left + 1, bn.top + 1, bn.width - 2, bn.height - 2, new Re("#DEDEDE")),
              this.renderer.renderBorders(eo(xn, bn, kn, wn)),
              mn.node.checked && (this.renderer.font(new Re("#424242"), "normal", "normal", "bold", yn - 3 + "px", "arial"),
                this.renderer.text("\u2714", bn.left + yn / 6, bn.top + yn - 1))
          }, this)
        }
        ,
        Je.prototype.paintRadio = function (mn) {
          var gn = mn.parseBounds()
            , yn = Math.min(gn.width, gn.height) - 2;
          this.renderer.clip(mn.backgroundClip, function () {
            this.renderer.circleStroke(gn.left + 1, gn.top + 1, yn, new Re("#DEDEDE"), 1, new Re("#A5A5A5")),
              mn.node.checked && this.renderer.circle(Math.ceil(gn.left + yn / 4) + 1, Math.ceil(gn.top + yn / 4) + 1, Math.floor(yn / 2), new Re("#424242"))
          }, this)
        }
        ,
        Je.prototype.paintFormValue = function (mn) {
          var gn = mn.getValue();
          if (0 < gn.length) {
            var yn = mn.node.ownerDocument
              , bn = yn.createElement("html2canvaswrapper");
            ["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"].forEach(function (wn) {
              try {
                bn.style[wn] = mn.css(wn)
              } catch (xn) {
                He("html2canvas: Parse: Exception caught in renderFormValue: " + xn.message)
              }
            });
            var vn = mn.parseBounds();
            bn.style.position = "fixed",
              bn.style.left = vn.left + "px",
              bn.style.top = vn.top + "px",
              bn.textContent = gn,
              yn.body.appendChild(bn),
              this.paintText(new Go(bn.firstChild, mn)),
              yn.body.removeChild(bn)
          }
        }
        ,
        Je.prototype.paintText = function (mn) {
          mn.applyTextTransform();
          var gn = ae.html2canvas.punycode.ucs2.decode(mn.node.data)
            , yn = this.options.letterRendering && !ho(mn) || Do(mn.node.data) ? gn.map(function (kn) {
              return ae.html2canvas.punycode.ucs2.encode([kn])
            }) : No(gn)
            , bn = mn.parent.fontWeight()
            , vn = mn.parent.css("fontSize")
            , wn = mn.parent.css("fontFamily")
            , xn = mn.parent.parseTextShadows();
          this.renderer.font(mn.parent.color("color"), mn.parent.css("fontStyle"), mn.parent.css("fontVariant"), bn, vn, wn),
            xn.length ? this.renderer.fontShadow(xn[0].color, xn[0].offsetX, xn[0].offsetY, xn[0].blur) : this.renderer.clearShadow(),
            this.renderer.clip(mn.parent.clip, function () {
              yn.map(this.parseTextBounds(mn), this).forEach(function (kn, Cn) {
                kn && (this.renderer.text(yn[Cn], kn.left, kn.bottom),
                  this.renderTextDecoration(mn.parent, kn, this.fontMetrics.getMetrics(wn, vn)))
              }, this)
            }, this)
        }
        ,
        Je.prototype.renderTextDecoration = function (mn, gn, yn) {
          switch (mn.css("textDecoration").split(" ")[0]) {
            case "underline":
              this.renderer.rectangle(gn.left, Math.round(gn.top + yn.baseline + yn.lineWidth), gn.width, 1, mn.color("color"));
              break;
            case "overline":
              this.renderer.rectangle(gn.left, Math.round(gn.top), gn.width, 1, mn.color("color"));
              break;
            case "line-through":
              this.renderer.rectangle(gn.left, Math.ceil(gn.top + yn.middle + yn.lineWidth), gn.width, 1, mn.color("color"));
          }
        }
        ;
      var cn = {
        inset: [["darken", 0.6], ["darken", 0.1], ["darken", 0.1], ["darken", 0.6]]
      };
      Je.prototype.parseBorders = function (mn) {
        var gn = mn.parseBounds()
          , yn = mo(mn)
          , bn = ["Top", "Right", "Bottom", "Left"].map(function (wn, xn) {
            var kn = mn.css("border" + wn + "Style")
              , Cn = mn.color("border" + wn + "Color");
            "inset" === kn && Cn.isBlack() && (Cn = new Re([255, 255, 255, Cn.a]));
            var En = cn[kn] ? cn[kn][xn] : null;
            return {
              width: mn.cssInt("border" + wn + "Width"),
              color: En ? Cn[En[0]](En[1]) : Cn,
              args: null
            }
          })
          , vn = oo(gn, yn, bn);
        return {
          clip: this.parseBackgroundClip(mn, vn, bn, yn, gn),
          borders: eo(bn, gn, vn, yn)
        }
      }
        ,
        Je.prototype.parseBackgroundClip = function (mn, gn, yn, bn, vn) {
          var wn = [];
          switch (mn.css("backgroundClip")) {
            case "content-box":
            case "padding-box":
              ao(wn, bn[0], bn[1], gn.topLeftInner, gn.topRightInner, vn.left + yn[3].width, vn.top + yn[0].width),
                ao(wn, bn[1], bn[2], gn.topRightInner, gn.bottomRightInner, vn.left + vn.width - yn[1].width, vn.top + yn[0].width),
                ao(wn, bn[2], bn[3], gn.bottomRightInner, gn.bottomLeftInner, vn.left + vn.width - yn[1].width, vn.top + vn.height - yn[2].width),
                ao(wn, bn[3], bn[0], gn.bottomLeftInner, gn.topLeftInner, vn.left + yn[3].width, vn.top + vn.height - yn[2].width);
              break;
            default:
              ao(wn, bn[0], bn[1], gn.topLeftOuter, gn.topRightOuter, vn.left, vn.top),
                ao(wn, bn[1], bn[2], gn.topRightOuter, gn.bottomRightOuter, vn.left + vn.width, vn.top),
                ao(wn, bn[2], bn[3], gn.bottomRightOuter, gn.bottomLeftOuter, vn.left + vn.width, vn.top + vn.height),
                ao(wn, bn[3], bn[0], gn.bottomLeftOuter, gn.topLeftOuter, vn.left, vn.top + vn.height);
          }
          return wn
        }
        ;
      var pn = 0
        , un = "withCredentials" in new XMLHttpRequest
        , hn = "crossOrigin" in new Image;
      Fo.prototype.cloneTo = function (mn) {
        Fo.prototype.cloneTo.call(this, mn),
          mn.isPseudoElement = !0,
          mn.before = this.before
      }
        ,
        Fo.prototype = Object.create(Fe.prototype),
        Fo.prototype.appendToDOM = function () {
          this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node),
            this.parent.node.className += " " + this.getHideClass()
        }
        ,
        Fo.prototype.cleanDOM = function () {
          this.node.parentNode.removeChild(this.node),
            this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
        }
        ,
        Fo.prototype.getHideClass = function () {
          return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")]
        }
        ,
        Fo.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before",
        Fo.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after",
        Vo.prototype.renderImage = function (mn, gn, yn, bn) {
          var vn = mn.cssInt("paddingLeft")
            , wn = mn.cssInt("paddingTop")
            , xn = mn.cssInt("paddingRight")
            , kn = mn.cssInt("paddingBottom")
            , Cn = yn.borders
            , En = gn.width - (Cn[1].width + Cn[3].width + vn + xn)
            , Sn = gn.height - (Cn[0].width + Cn[2].width + wn + kn);
          this.drawImage(bn, 0, 0, bn.image.width || En, bn.image.height || Sn, gn.left + vn + Cn[3].width, gn.top + wn + Cn[0].width, En, Sn)
        }
        ,
        Vo.prototype.renderBackground = function (mn, gn, yn) {
          0 < gn.height && 0 < gn.width && (this.renderBackgroundColor(mn, gn),
            this.renderBackgroundImage(mn, gn, yn))
        }
        ,
        Vo.prototype.renderBackgroundColor = function (mn, gn) {
          var yn = mn.color("backgroundColor");
          yn.isTransparent() || this.rectangle(gn.left, gn.top, gn.width, gn.height, yn)
        }
        ,
        Vo.prototype.renderBorders = function (mn) {
          mn.forEach(this.renderBorder, this)
        }
        ,
        Vo.prototype.renderBorder = function (mn) {
          mn.color.isTransparent() || null === mn.args || this.drawShape(mn.args, mn.color)
        }
        ,
        Vo.prototype.renderBackgroundImage = function (mn, gn, yn) {
          mn.parseBackgroundImages().reverse().forEach(function (bn, vn, wn) {
            switch (bn.method) {
              case "url":
                var xn = this.images.get(bn.args[0]);
                xn ? this.renderBackgroundRepeating(mn, gn, xn, wn.length - (vn + 1), yn) : He("Error loading background-image", bn.args[0]);
                break;
              case "linear-gradient":
              case "gradient":
                var kn = this.images.get(bn.value);
                kn ? this.renderBackgroundGradient(kn, gn, yn) : He("Error loading background-image", bn.args[0]);
                break;
              case "none":
                break;
              default:
                He("Unknown background-image type", bn.args[0]);
            }
          }, this)
        }
        ,
        Vo.prototype.renderBackgroundRepeating = function (mn, gn, yn, bn, vn) {
          var wn = mn.parseBackgroundSize(gn, yn.image, bn)
            , xn = mn.parseBackgroundPosition(gn, yn.image, bn, wn);
          switch (mn.parseBackgroundRepeat(bn)) {
            case "repeat-x":
            case "repeat no-repeat":
              this.backgroundRepeatShape(yn, xn, wn, gn, gn.left + vn[3], gn.top + xn.top + vn[0], 99999, wn.height, vn);
              break;
            case "repeat-y":
            case "no-repeat repeat":
              this.backgroundRepeatShape(yn, xn, wn, gn, gn.left + xn.left + vn[3], gn.top + vn[0], wn.width, 99999, vn);
              break;
            case "no-repeat":
              this.backgroundRepeatShape(yn, xn, wn, gn, gn.left + xn.left + vn[3], gn.top + xn.top + vn[0], wn.width, wn.height, vn);
              break;
            default:
              this.renderBackgroundRepeat(yn, xn, wn, {
                top: gn.top,
                left: gn.left
              }, vn[3], vn[0]);
          }
        }
        ,
        zo.prototype = Object.create(Fe.prototype),
        zo.prototype.getParentStack = function (mn) {
          var gn = this.parent ? this.parent.stack : null;
          return gn ? gn.ownStacking ? gn : gn.getParentStack(mn) : mn.stack
        }
        ,
        qo.prototype.testRangeBounds = function (mn) {
          var gn, yn, bn = !1;
          return mn.createRange && (gn = mn.createRange()).getBoundingClientRect && ((yn = mn.createElement("boundtest")).style.height = "123px",
            yn.style.display = "block",
            mn.body.appendChild(yn),
            gn.selectNode(yn),
            123 === gn.getBoundingClientRect().height && (bn = !0),
            mn.body.removeChild(yn)),
            bn
        }
        ,
        qo.prototype.testCORS = function () {
          return void 0 !== new Image().crossOrigin
        }
        ,
        qo.prototype.testSVG = function () {
          var mn = new Image
            , gn = se.createElement("canvas")
            , yn = gn.getContext("2d");
          mn.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
          try {
            yn.drawImage(mn, 0, 0),
              gn.toDataURL()
          } catch (bn) {
            return !1
          }
          return !0
        }
        ,
        Xo.prototype.hasFabric = function () {
          return html2canvas.fabric ? Promise.resolve() : Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))
        }
        ,
        Xo.prototype.inlineFormatting = function (mn) {
          return /^data:image\/svg\+xml;base64,/.test(mn) ? this.decode64(this.removeContentType(mn)) : this.removeContentType(mn)
        }
        ,
        Xo.prototype.removeContentType = function (mn) {
          return mn.replace(/^data:image\/svg\+xml(;base64)?,/, "")
        }
        ,
        Xo.prototype.isInline = function (mn) {
          return /^data:image\/svg\+xml/i.test(mn)
        }
        ,
        Xo.prototype.createCanvas = function (mn) {
          var gn = this;
          return function (yn, bn) {
            var vn = new html2canvas.fabric.StaticCanvas("c");
            gn.image = vn.lowerCanvasEl,
              vn.setWidth(bn.width).setHeight(bn.height).add(html2canvas.fabric.util.groupSVGElements(yn, bn)).renderAll(),
              mn(vn.lowerCanvasEl)
          }
        }
        ,
        Xo.prototype.decode64 = function (mn) {
          return "function" == typeof ae.atob ? ae.atob(mn) : Yo(mn)
        }
        ,
        Uo.prototype = Object.create(Xo.prototype),
        Go.prototype = Object.create(Fe.prototype),
        Go.prototype.applyTextTransform = function () {
          this.node.data = this.transform(this.parent.css("textTransform"))
        }
        ,
        Go.prototype.transform = function (mn) {
          var gn = this.node.data;
          return "lowercase" === mn ? gn.toLowerCase() : "capitalize" === mn ? gn.replace(/(^|\s|:|-|\(|\))([a-z])/g, Qo) : "uppercase" === mn ? gn.toUpperCase() : gn
        }
        ,
        Jo.prototype = Object.create(_e.prototype),
        Zo.prototype = Object.create(Vo.prototype),
        Zo.prototype.setFillStyle = function (mn) {
          return this.ctx.fillStyle = "object" == typeof mn && mn.isColor ? mn.toString() : mn,
            this.ctx
        }
        ,
        Zo.prototype.rectangle = function (mn, gn, yn, bn, vn) {
          this.setFillStyle(vn).fillRect(mn, gn, yn, bn)
        }
        ,
        Zo.prototype.circle = function (mn, gn, yn, bn) {
          this.setFillStyle(bn),
            this.ctx.beginPath(),
            this.ctx.arc(mn + yn / 2, gn + yn / 2, yn / 2, 0, 2 * Math.PI, !0),
            this.ctx.closePath(),
            this.ctx.fill()
        }
        ,
        Zo.prototype.circleStroke = function (mn, gn, yn, bn, vn, wn) {
          this.circle(mn, gn, yn, bn),
            this.ctx.strokeStyle = wn.toString(),
            this.ctx.stroke()
        }
        ,
        Zo.prototype.drawShape = function (mn, gn) {
          this.shape(mn),
            this.setFillStyle(gn).fill()
        }
        ,
        Zo.prototype.taints = function (mn) {
          if (null === mn.tainted) {
            this.taintCtx.drawImage(mn.image, 0, 0);
            try {
              this.taintCtx.getImageData(0, 0, 1, 1),
                mn.tainted = !1
            } catch (gn) {
              this.taintCtx = se.createElement("canvas").getContext("2d"),
                mn.tainted = !0
            }
          }
          return mn.tainted
        }
        ,
        Zo.prototype.drawImage = function (mn, gn, yn, bn, vn, wn, xn, kn, Cn) {
          this.taints(mn) && !this.options.allowTaint || this.ctx.drawImage(mn.image, gn, yn, bn, vn, wn, xn, kn, Cn)
        }
        ,
        Zo.prototype.clip = function (mn, gn, yn) {
          this.ctx.save(),
            mn.filter($o).forEach(function (bn) {
              this.shape(bn).clip()
            }, this),
            gn.call(yn),
            this.ctx.restore()
        }
        ,
        Zo.prototype.shape = function (mn) {
          return this.ctx.beginPath(),
            mn.forEach(function (gn, yn) {
              "rect" === gn[0] ? this.ctx.rect.apply(this.ctx, gn.slice(1)) : this.ctx[0 === yn ? "moveTo" : gn[0] + "To"].apply(this.ctx, gn.slice(1))
            }, this),
            this.ctx.closePath(),
            this.ctx
        }
        ,
        Zo.prototype.font = function (mn, gn, yn, bn, vn, wn) {
          this.setFillStyle(mn).font = [gn, yn, bn, vn, wn].join(" ").split(",")[0]
        }
        ,
        Zo.prototype.fontShadow = function (mn, gn, yn, bn) {
          this.setVariable("shadowColor", mn.toString()).setVariable("shadowOffsetY", gn).setVariable("shadowOffsetX", yn).setVariable("shadowBlur", bn)
        }
        ,
        Zo.prototype.clearShadow = function () {
          this.setVariable("shadowColor", "rgba(0,0,0,0)")
        }
        ,
        Zo.prototype.setOpacity = function (mn) {
          this.ctx.globalAlpha = mn
        }
        ,
        Zo.prototype.setTransform = function (mn) {
          this.ctx.translate(mn.origin[0], mn.origin[1]),
            this.ctx.transform.apply(this.ctx, mn.matrix),
            this.ctx.translate(-mn.origin[0], -mn.origin[1])
        }
        ,
        Zo.prototype.setVariable = function (mn, gn) {
          return this.variables[mn] !== gn && (this.variables[mn] = this.ctx[mn] = gn),
            this
        }
        ,
        Zo.prototype.text = function (mn, gn, yn) {
          this.ctx.fillText(mn, gn, yn)
        }
        ,
        Zo.prototype.backgroundRepeatShape = function (mn, gn, yn, bn, vn, wn, xn, kn, Cn) {
          var En = [["line", Math.round(vn), Math.round(wn)], ["line", Math.round(vn + xn), Math.round(wn)], ["line", Math.round(vn + xn), Math.round(kn + wn)], ["line", Math.round(vn), Math.round(kn + wn)]];
          this.clip([En], function () {
            this.renderBackgroundRepeat(mn, gn, yn, bn, Cn[3], Cn[0])
          }, this)
        }
        ,
        Zo.prototype.renderBackgroundRepeat = function (mn, gn, yn, bn, vn, wn) {
          var xn = Math.round(bn.left + gn.left + vn)
            , kn = Math.round(bn.top + gn.top + wn);
          this.setFillStyle(this.ctx.createPattern(this.resizeImage(mn, yn), "repeat")),
            this.ctx.translate(xn, kn),
            this.ctx.fill(),
            this.ctx.translate(-xn, -kn)
        }
        ,
        Zo.prototype.renderBackgroundGradient = function (mn, gn) {
          if (mn instanceof We) {
            var yn = this.ctx.createLinearGradient(gn.left + gn.width * mn.x0, gn.top + gn.height * mn.y0, gn.left + gn.width * mn.x1, gn.top + gn.height * mn.y1);
            mn.colorStops.forEach(function (bn) {
              yn.addColorStop(bn.stop, bn.color.toString())
            }),
              this.rectangle(gn.left, gn.top, gn.width, gn.height, yn)
          }
        }
        ,
        Zo.prototype.resizeImage = function (mn, gn) {
          var yn = mn.image;
          if (yn.width === gn.width && yn.height === gn.height)
            return yn;
          var bn = se.createElement("canvas");
          return bn.width = gn.width,
            bn.height = gn.height,
            bn.getContext("2d").drawImage(yn, 0, 0, yn.width, yn.height, 0, 0, gn.width, gn.height),
            bn
        }
    } else
      (ae || module.exports).html2canvas = function () {
        return Promise.reject("No canvas support")
      }
  }
    .call({}, "undefined" == typeof window ? void 0 : window, "undefined" == typeof document ? void 0 : document),
  function () {
    function ae(se) {
      var le = ae.modules[se];
      if (!le)
        throw new Error("failed to require \"" + se + "\"");
      return "exports" in le || "function" != typeof le.definition || (le.client = le.component = !0,
        le.definition.call(this, le.exports = {}, le),
        delete le.definition),
        le.exports
    }
    ae.loader = "component",
      ae.helper = {},
      ae.helper.semVerSort = function (se, le) {
        for (var de = se.version.split("."), ce = le.version.split("."), pe = 0; pe < de.length; ++pe) {
          var ue = parseInt(de[pe], 10)
            , he = parseInt(ce[pe], 10);
          if (ue === he) {
            var me = de[pe].substr(("" + ue).length)
              , ge = ce[pe].substr(("" + he).length);
            if ("" === me && "" !== ge)
              return 1;
            if ("" !== me && "" === ge)
              return -1;
            if ("" !== me && "" !== ge)
              return me > ge ? 1 : -1;
            continue
          } else
            return ue > he ? 1 : -1
        }
        return 0
      }
      ,
      ae.latest = function (se, le) {
        function de(we) {
          throw new Error("failed to find latest module of \"" + we + "\"")
        }
        var ce = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/
          , pe = /(.*)~(.*)/;
        pe.test(se) || de(se);
        for (var fe, ue = Object.keys(ae.modules), he = [], me = [], ge = 0; ge < ue.length; ge++)
          if (fe = ue[ge],
            new RegExp(se + "@").test(fe)) {
            var ye = fe.substr(se.length + 1)
              , be = ce.exec(fe);
            null == be ? me.push({
              version: ye,
              name: fe
            }) : he.push({
              version: ye,
              name: fe
            })
          }
        if (0 === he.concat(me).length && de(se),
          0 < he.length) {
          var ve = he.sort(ae.helper.semVerSort).pop().name;
          return !0 === le ? ve : ae(ve)
        }
        var ve = me.sort(function (we, xe) {
          return we.name > xe.name
        })[0].name;
        return !0 === le ? ve : ae(ve)
      }
      ,
      ae.modules = {},
      ae.register = function (se, le) {
        ae.modules[se] = {
          definition: le
        }
      }
      ,
      ae.define = function (se, le) {
        ae.modules[se] = {
          exports: le
        }
      }
      ,
      ae.register("abpetkov~transitionize@0.0.3", function (se, le) {
        function de(ce, pe) {
          return this instanceof de ? void (this.element = ce,
            this.props = pe || {},
            this.init()) : new de(ce, pe)
        }
        le.exports = de,
          de.prototype.isSafari = function () {
            return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
          }
          ,
          de.prototype.init = function () {
            var ce = [];
            for (var pe in this.props)
              ce.push(pe + " " + this.props[pe]);
            this.element.style.transition = ce.join(", "),
              this.isSafari() && (this.element.style.webkitTransition = ce.join(", "))
          }
      }),
      ae.register("ftlabs~fastclick@v0.6.11", function (se, le) {
        function de(ce) {
          "use strict";
          var pe, ue = this;
          if (this.trackingClick = !1,
            this.trackingClickStart = 0,
            this.targetElement = null,
            this.touchStartX = 0,
            this.touchStartY = 0,
            this.lastTouchIdentifier = 0,
            this.touchBoundary = 10,
            this.layer = ce,
            !ce || !ce.nodeType)
            throw new TypeError("Layer must be a document node");
          this.onClick = function () {
            return de.prototype.onClick.apply(ue, arguments)
          }
            ,
            this.onMouse = function () {
              return de.prototype.onMouse.apply(ue, arguments)
            }
            ,
            this.onTouchStart = function () {
              return de.prototype.onTouchStart.apply(ue, arguments)
            }
            ,
            this.onTouchMove = function () {
              return de.prototype.onTouchMove.apply(ue, arguments)
            }
            ,
            this.onTouchEnd = function () {
              return de.prototype.onTouchEnd.apply(ue, arguments)
            }
            ,
            this.onTouchCancel = function () {
              return de.prototype.onTouchCancel.apply(ue, arguments)
            }
            ,
            de.notNeeded(ce) || (this.deviceIsAndroid && (ce.addEventListener("mouseover", this.onMouse, !0),
              ce.addEventListener("mousedown", this.onMouse, !0),
              ce.addEventListener("mouseup", this.onMouse, !0)),
              ce.addEventListener("click", this.onClick, !0),
              ce.addEventListener("touchstart", this.onTouchStart, !1),
              ce.addEventListener("touchmove", this.onTouchMove, !1),
              ce.addEventListener("touchend", this.onTouchEnd, !1),
              ce.addEventListener("touchcancel", this.onTouchCancel, !1),
              !Event.prototype.stopImmediatePropagation && (ce.removeEventListener = function (he, me, ge) {
                var fe = Node.prototype.removeEventListener;
                "click" === he ? fe.call(ce, he, me.hijacked || me, ge) : fe.call(ce, he, me, ge)
              }
                ,
                ce.addEventListener = function (he, me, ge) {
                  var fe = Node.prototype.addEventListener;
                  "click" === he ? fe.call(ce, he, me.hijacked || (me.hijacked = function (ye) {
                    ye.propagationStopped || me(ye)
                  }
                  ), ge) : fe.call(ce, he, me, ge)
                }
              ),
              "function" == typeof ce.onclick && (pe = ce.onclick,
                ce.addEventListener("click", function (he) {
                  pe(he)
                }, !1),
                ce.onclick = null))
        }
        de.prototype.deviceIsAndroid = 0 < navigator.userAgent.indexOf("Android"),
          de.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
          de.prototype.deviceIsIOS4 = de.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
          de.prototype.deviceIsIOSWithBadTarget = de.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
          de.prototype.needsClick = function (ce) {
            "use strict";
            switch (ce.nodeName.toLowerCase()) {
              case "button":
              case "select":
              case "textarea":
                if (ce.disabled)
                  return !0;
                break;
              case "input":
                if (this.deviceIsIOS && "file" === ce.type || ce.disabled)
                  return !0;
                break;
              case "label":
              case "video":
                return !0;
            }
            return /\bneedsclick\b/.test(ce.className)
          }
          ,
          de.prototype.needsFocus = function (ce) {
            "use strict";
            switch (ce.nodeName.toLowerCase()) {
              case "textarea":
                return !0;
              case "select":
                return !this.deviceIsAndroid;
              case "input":
                switch (ce.type) {
                  case "button":
                  case "checkbox":
                  case "file":
                  case "image":
                  case "radio":
                  case "submit":
                    return !1;
                }
                return !ce.disabled && !ce.readOnly;
              default:
                return /\bneedsfocus\b/.test(ce.className);
            }
          }
          ,
          de.prototype.sendClick = function (ce, pe) {
            "use strict";
            var ue, he;
            document.activeElement && document.activeElement !== ce && document.activeElement.blur(),
              he = pe.changedTouches[0],
              ue = document.createEvent("MouseEvents"),
              ue.initMouseEvent(this.determineEventType(ce), !0, !0, window, 1, he.screenX, he.screenY, he.clientX, he.clientY, !1, !1, !1, !1, 0, null),
              ue.forwardedTouchEvent = !0,
              ce.dispatchEvent(ue)
          }
          ,
          de.prototype.determineEventType = function (ce) {
            "use strict";
            return this.deviceIsAndroid && "select" === ce.tagName.toLowerCase() ? "mousedown" : "click"
          }
          ,
          de.prototype.focus = function (ce) {
            "use strict";
            var pe;
            this.deviceIsIOS && ce.setSelectionRange && 0 !== ce.type.indexOf("date") && "time" !== ce.type ? (pe = ce.value.length,
              ce.setSelectionRange(pe, pe)) : ce.focus()
          }
          ,
          de.prototype.updateScrollParent = function (ce) {
            "use strict";
            var pe, ue;
            if (pe = ce.fastClickScrollParent,
              !pe || !pe.contains(ce)) {
              ue = ce;
              do {
                if (ue.scrollHeight > ue.offsetHeight) {
                  pe = ue,
                    ce.fastClickScrollParent = ue;
                  break
                }
                ue = ue.parentElement
              } while (ue)
            }
            pe && (pe.fastClickLastScrollTop = pe.scrollTop)
          }
          ,
          de.prototype.getTargetElementFromEventTarget = function (ce) {
            "use strict";
            return ce.nodeType === Node.TEXT_NODE ? ce.parentNode : ce
          }
          ,
          de.prototype.onTouchStart = function (ce) {
            "use strict";
            var pe, ue, he;
            if (1 < ce.targetTouches.length)
              return !0;
            if (pe = this.getTargetElementFromEventTarget(ce.target),
              ue = ce.targetTouches[0],
              this.deviceIsIOS) {
              if (he = window.getSelection(),
                he.rangeCount && !he.isCollapsed)
                return !0;
              if (!this.deviceIsIOS4) {
                if (ue.identifier === this.lastTouchIdentifier)
                  return ce.preventDefault(),
                    !1;
                this.lastTouchIdentifier = ue.identifier,
                  this.updateScrollParent(pe)
              }
            }
            return this.trackingClick = !0,
              this.trackingClickStart = ce.timeStamp,
              this.targetElement = pe,
              this.touchStartX = ue.pageX,
              this.touchStartY = ue.pageY,
              200 > ce.timeStamp - this.lastClickTime && ce.preventDefault(),
              !0
          }
          ,
          de.prototype.touchHasMoved = function (ce) {
            "use strict";
            var pe = ce.changedTouches[0]
              , ue = this.touchBoundary;
            return Math.abs(pe.pageX - this.touchStartX) > ue || Math.abs(pe.pageY - this.touchStartY) > ue
          }
          ,
          de.prototype.onTouchMove = function (ce) {
            "use strict";
            return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(ce.target) || this.touchHasMoved(ce)) && (this.trackingClick = !1,
              this.targetElement = null),
              !0)
          }
          ,
          de.prototype.findControl = function (ce) {
            "use strict";
            return void 0 === ce.control ? ce.htmlFor ? document.getElementById(ce.htmlFor) : ce.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") : ce.control
          }
          ,
          de.prototype.onTouchEnd = function (ce) {
            "use strict";
            var pe, ue, he, me, ge, fe = this.targetElement;
            if (!this.trackingClick)
              return !0;
            if (200 > ce.timeStamp - this.lastClickTime)
              return this.cancelNextClick = !0,
                !0;
            if (this.cancelNextClick = !1,
              this.lastClickTime = ce.timeStamp,
              ue = this.trackingClickStart,
              this.trackingClick = !1,
              this.trackingClickStart = 0,
              this.deviceIsIOSWithBadTarget && (ge = ce.changedTouches[0],
                fe = document.elementFromPoint(ge.pageX - window.pageXOffset, ge.pageY - window.pageYOffset) || fe,
                fe.fastClickScrollParent = this.targetElement.fastClickScrollParent),
              he = fe.tagName.toLowerCase(),
              "label" === he) {
              if (pe = this.findControl(fe),
                pe) {
                if (this.focus(fe),
                  this.deviceIsAndroid)
                  return !1;
                fe = pe
              }
            } else if (this.needsFocus(fe))
              return 100 < ce.timeStamp - ue || this.deviceIsIOS && window.top !== window && "input" === he ? (this.targetElement = null,
                !1) : (this.focus(fe),
                  this.deviceIsIOS4 && "select" == he || (this.targetElement = null,
                    ce.preventDefault()),
                  !1);
            return this.deviceIsIOS && !this.deviceIsIOS4 && (me = fe.fastClickScrollParent,
              me && me.fastClickLastScrollTop !== me.scrollTop) || (this.needsClick(fe) || (ce.preventDefault(),
                this.sendClick(fe, ce)),
                !1)
          }
          ,
          de.prototype.onTouchCancel = function () {
            "use strict";
            this.trackingClick = !1,
              this.targetElement = null
          }
          ,
          de.prototype.onMouse = function (ce) {
            "use strict";
            return !this.targetElement || !!ce.forwardedTouchEvent || !ce.cancelable || (!this.needsClick(this.targetElement) || this.cancelNextClick ? (ce.stopImmediatePropagation ? ce.stopImmediatePropagation() : ce.propagationStopped = !0,
              ce.stopPropagation(),
              ce.preventDefault(),
              !1) : !0)
          }
          ,
          de.prototype.onClick = function (ce) {
            "use strict";
            var pe;
            return this.trackingClick ? (this.targetElement = null,
              this.trackingClick = !1,
              !0) : "submit" === ce.target.type && 0 === ce.detail || (pe = this.onMouse(ce),
                pe || (this.targetElement = null),
                pe)
          }
          ,
          de.prototype.destroy = function () {
            "use strict";
            var ce = this.layer;
            this.deviceIsAndroid && (ce.removeEventListener("mouseover", this.onMouse, !0),
              ce.removeEventListener("mousedown", this.onMouse, !0),
              ce.removeEventListener("mouseup", this.onMouse, !0)),
              ce.removeEventListener("click", this.onClick, !0),
              ce.removeEventListener("touchstart", this.onTouchStart, !1),
              ce.removeEventListener("touchmove", this.onTouchMove, !1),
              ce.removeEventListener("touchend", this.onTouchEnd, !1),
              ce.removeEventListener("touchcancel", this.onTouchCancel, !1)
          }
          ,
          de.notNeeded = function (ce) {
            "use strict";
            var pe, ue;
            if ("undefined" == typeof window.ontouchstart)
              return !0;
            if (ue = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1],
              ue) {
              if (!de.prototype.deviceIsAndroid)
                return !0;
              if (pe = document.querySelector("meta[name=viewport]"),
                pe) {
                if (-1 !== pe.content.indexOf("user-scalable=no"))
                  return !0;
                if (31 < ue && window.innerWidth <= window.screen.width)
                  return !0
              }
            }
            return "none" === ce.style.msTouchAction
          }
          ,
          de.attach = function (ce) {
            "use strict";
            return new de(ce)
          }
          ,
          "undefined" != typeof define && define.amd ? define(function () {
            "use strict";
            return de
          }) : "undefined" != typeof le && le.exports ? (le.exports = de.attach,
            le.exports.FastClick = de) : window.FastClick = de
      }),
      ae.register("component~indexof@0.0.3", function (se, le) {
        le.exports = function (de, ce) {
          if (de.indexOf)
            return de.indexOf(ce);
          for (var pe = 0; pe < de.length; ++pe)
            if (de[pe] === ce)
              return pe;
          return -1
        }
      }),
      ae.register("component~classes@1.2.1", function (se, le) {
        function de(he) {
          if (!he)
            throw new Error("A DOM element reference is required");
          this.el = he,
            this.list = he.classList
        }
        var ce = ae("component~indexof@0.0.3")
          , pe = /\s+/
          , ue = Object.prototype.toString;
        le.exports = function (he) {
          return new de(he)
        }
          ,
          de.prototype.add = function (he) {
            if (this.list)
              return this.list.add(he),
                this;
            var me = this.array()
              , ge = ce(me, he);
            return ~ge || me.push(he),
              this.el.className = me.join(" "),
              this
          }
          ,
          de.prototype.remove = function (he) {
            if ("[object RegExp]" == ue.call(he))
              return this.removeMatching(he);
            if (this.list)
              return this.list.remove(he),
                this;
            var me = this.array()
              , ge = ce(me, he);
            return ~ge && me.splice(ge, 1),
              this.el.className = me.join(" "),
              this
          }
          ,
          de.prototype.removeMatching = function (he) {
            for (var me = this.array(), ge = 0; ge < me.length; ge++)
              he.test(me[ge]) && this.remove(me[ge]);
            return this
          }
          ,
          de.prototype.toggle = function (he, me) {
            return this.list ? ("undefined" == typeof me ? this.list.toggle(he) : me !== this.list.toggle(he, me) && this.list.toggle(he),
              this) : ("undefined" == typeof me ? this.has(he) ? this.remove(he) : this.add(he) : me ? this.add(he) : this.remove(he),
                this)
          }
          ,
          de.prototype.array = function () {
            var he = this.el.className.replace(/^\s+|\s+$/g, "")
              , me = he.split(pe);
            return "" === me[0] && me.shift(),
              me
          }
          ,
          de.prototype.has = de.prototype.contains = function (he) {
            return this.list ? this.list.contains(he) : !!~ce(this.array(), he)
          }
      }),
      ae.register("component~event@0.1.4", function (se) {
        var de = window.addEventListener ? "addEventListener" : "attachEvent"
          , ce = window.removeEventListener ? "removeEventListener" : "detachEvent"
          , pe = "addEventListener" == de ? "" : "on";
        se.bind = function (ue, he, me, ge) {
          return ue[de](pe + he, me, ge || !1),
            me
        }
          ,
          se.unbind = function (ue, he, me, ge) {
            return ue[ce](pe + he, me, ge || !1),
              me
          }
      }),
      ae.register("component~query@0.0.3", function (se, le) {
        function de(ce, pe) {
          return pe.querySelector(ce)
        }
        se = le.exports = function (ce, pe) {
          return pe = pe || document,
            de(ce, pe)
        }
          ,
          se.all = function (ce, pe) {
            return pe = pe || document,
              pe.querySelectorAll(ce)
          }
          ,
          se.engine = function (ce) {
            if (!ce.one)
              throw new Error(".one callback required");
            if (!ce.all)
              throw new Error(".all callback required");
            return de = ce.one,
              se.all = ce.all,
              se
          }
      }),
      ae.register("component~matches-selector@0.1.5", function (se, le) {
        var ce = ae("component~query@0.0.3")
          , pe = Element.prototype
          , ue = pe.matches || pe.webkitMatchesSelector || pe.mozMatchesSelector || pe.msMatchesSelector || pe.oMatchesSelector;
        le.exports = function (he, me) {
          if (!he || 1 !== he.nodeType)
            return !1;
          if (ue)
            return ue.call(he, me);
          for (var ge = ce.all(me, he.parentNode), fe = 0; fe < ge.length; ++fe)
            if (ge[fe] == he)
              return !0;
          return !1
        }
      }),
      ae.register("component~closest@0.1.4", function (se, le) {
        var de = ae("component~matches-selector@0.1.5");
        le.exports = function (ce, pe, ue, he) {
          for (ce = ue ? {
            parentNode: ce
          } : ce,
            he = he || document; (ce = ce.parentNode) && ce !== document;) {
            if (de(ce, pe))
              return ce;
            if (ce === he)
              return
          }
        }
      }),
      ae.register("component~delegate@0.2.3", function (se) {
        var de = ae("component~closest@0.1.4")
          , ce = ae("component~event@0.1.4");
        se.bind = function (pe, ue, he, me, ge) {
          return ce.bind(pe, he, function (fe) {
            var ye = fe.target || fe.srcElement;
            fe.delegateTarget = de(ye, ue, !0, pe),
              fe.delegateTarget && me.call(pe, fe)
          }, ge)
        }
          ,
          se.unbind = function (pe, ue, he, me) {
            ce.unbind(pe, ue, he, me)
          }
      }),
      ae.register("component~events@1.0.9", function (se, le) {
        function de(he, me) {
          if (!(this instanceof de))
            return new de(he, me);
          if (!he)
            throw new Error("element required");
          if (!me)
            throw new Error("object required");
          this.el = he,
            this.obj = me,
            this._events = {}
        }
        function ce(he) {
          var me = he.split(/ +/);
          return {
            name: me.shift(),
            selector: me.join(" ")
          }
        }
        var pe = ae("component~event@0.1.4")
          , ue = ae("component~delegate@0.2.3");
        le.exports = de,
          de.prototype.sub = function (he, me, ge) {
            this._events[he] = this._events[he] || {},
              this._events[he][me] = ge
          }
          ,
          de.prototype.bind = function (he, me) {
            function ge() {
              var xe = [].slice.call(arguments).concat(we);
              be[me].apply(be, xe)
            }
            var fe = ce(he)
              , ye = this.el
              , be = this.obj
              , ve = fe.name
              , me = me || "on" + ve
              , we = [].slice.call(arguments, 2);
            return fe.selector ? ge = ue.bind(ye, fe.selector, ve, ge) : pe.bind(ye, ve, ge),
              this.sub(ve, me, ge),
              ge
          }
          ,
          de.prototype.unbind = function (he, me) {
            if (0 == arguments.length)
              return this.unbindAll();
            if (1 == arguments.length)
              return this.unbindAllOf(he);
            var ge = this._events[he];
            if (ge) {
              var fe = ge[me];
              fe && pe.unbind(this.el, he, fe)
            }
          }
          ,
          de.prototype.unbindAll = function () {
            for (var he in this._events)
              this.unbindAllOf(he)
          }
          ,
          de.prototype.unbindAllOf = function (he) {
            var me = this._events[he];
            if (me)
              for (var ge in me)
                this.unbind(he, ge)
          }
      }),
      ae.register("switchery", function (se, le) {
        function de(ge, fe) {
          if (!(this instanceof de))
            return new de(ge, fe);
          for (var ye in this.element = ge,
            this.options = fe || {},
            me)
            null == this.options[ye] && (this.options[ye] = me[ye]);
          null != this.element && "checkbox" == this.element.type && this.init(),
            !0 === this.isDisabled() && this.disable()
        }
        var ce = ae("abpetkov~transitionize@0.0.3")
          , pe = ae("ftlabs~fastclick@v0.6.11")
          , ue = ae("component~classes@1.2.1")
          , he = ae("component~events@1.0.9");
        le.exports = de;
        var me = {
          color: "#64bd63",
          secondaryColor: "#dfdfdf",
          jackColor: "#fff",
          jackSecondaryColor: null,
          className: "switchery",
          disabled: !1,
          disabledOpacity: .5,
          speed: "0.4s",
          size: "default"
        };
        de.prototype.hide = function () {
          this.element.style.display = "none"
        }
          ,
          de.prototype.show = function () {
            var ge = this.create();
            this.insertAfter(this.element, ge)
          }
          ,
          de.prototype.create = function () {
            return this.switcher = document.createElement("span"),
              this.jack = document.createElement("small"),
              this.switcher.appendChild(this.jack),
              this.switcher.className = this.options.className,
              this.events = he(this.switcher, this),
              this.switcher
          }
          ,
          de.prototype.insertAfter = function (ge, fe) {
            ge.parentNode.insertBefore(fe, ge.nextSibling)
          }
          ,
          de.prototype.setPosition = function (ge) {
            var fe = this.isChecked()
              , ye = this.switcher
              , be = this.jack;
            ge && fe ? fe = !1 : ge && !fe && (fe = !0),
              !0 === fe ? (this.element.checked = !0,
                be.style.left = window.getComputedStyle ? parseInt(window.getComputedStyle(ye).width) - parseInt(window.getComputedStyle(be).width) + "px" : parseInt(ye.currentStyle.width) - parseInt(be.currentStyle.width) + "px",
                this.options.color && this.colorize(),
                this.setSpeed()) : (be.style.left = 0,
                  this.element.checked = !1,
                  this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor,
                  this.switcher.style.borderColor = this.options.secondaryColor,
                  this.switcher.style.backgroundColor = this.options.secondaryColor === me.secondaryColor ? "#fff" : this.options.secondaryColor,
                  this.jack.style.backgroundColor = this.options.jackSecondaryColor === this.options.jackColor ? this.options.jackColor : this.options.jackSecondaryColor,
                  this.setSpeed())
          }
          ,
          de.prototype.setSpeed = function () {
            var ge = {}
              , fe = {
                "background-color": this.options.speed,
                left: this.options.speed.replace(/[a-z]/, "") / 2 + "s"
              };
            ge = this.isChecked() ? {
              border: this.options.speed,
              "box-shadow": this.options.speed,
              "background-color": 3 * this.options.speed.replace(/[a-z]/, "") + "s"
            } : {
              border: this.options.speed,
              "box-shadow": this.options.speed
            },
              ce(this.switcher, ge),
              ce(this.jack, fe)
          }
          ,
          de.prototype.setSize = function () {
            switch (this.options.size) {
              case "small":
                ue(this.switcher).add("switchery-small");
                break;
              case "large":
                ue(this.switcher).add("switchery-large");
                break;
              default:
                ue(this.switcher).add("switchery-default");
            }
          }
          ,
          de.prototype.colorize = function () {
            var ge = this.switcher.offsetHeight / 2;
            this.switcher.style.backgroundColor = this.options.color,
              this.switcher.style.borderColor = this.options.color,
              this.switcher.style.boxShadow = "inset 0 0 0 " + ge + "px " + this.options.color,
              this.jack.style.backgroundColor = this.options.jackColor
          }
          ,
          de.prototype.handleOnchange = function () {
            if (document.dispatchEvent) {
              var fe = document.createEvent("HTMLEvents");
              fe.initEvent("change", !0, !0),
                this.element.dispatchEvent(fe)
            } else
              this.element.fireEvent("onchange")
          }
          ,
          de.prototype.handleChange = function () {
            var ge = this
              , fe = this.element;
            fe.addEventListener ? fe.addEventListener("change", function () {
              ge.setPosition()
            }) : fe.attachEvent("onchange", function () {
              ge.setPosition()
            })
          }
          ,
          de.prototype.handleClick = function () {
            var ge = this.switcher;
            pe(ge),
              this.events.bind("click", "bindClick")
          }
          ,
          de.prototype.bindClick = function () {
            var ge = this.element.parentNode.tagName.toLowerCase();
            this.setPosition("label" !== ge),
              this.handleOnchange(this.element.checked)
          }
          ,
          de.prototype.markAsSwitched = function () {
            this.element.setAttribute("data-switchery", !0)
          }
          ,
          de.prototype.markedAsSwitched = function () {
            return this.element.getAttribute("data-switchery")
          }
          ,
          de.prototype.init = function () {
            this.hide(),
              this.show(),
              this.setSize(),
              this.setPosition(),
              this.markAsSwitched(),
              this.handleChange(),
              this.handleClick()
          }
          ,
          de.prototype.isChecked = function () {
            return this.element.checked
          }
          ,
          de.prototype.isDisabled = function () {
            return this.options.disabled || this.element.disabled || this.element.readOnly
          }
          ,
          de.prototype.destroy = function () {
            this.events.unbind()
          }
          ,
          de.prototype.enable = function () {
            this.options.disabled && (this.options.disabled = !1),
              this.element.disabled && (this.element.disabled = !1),
              this.element.readOnly && (this.element.readOnly = !1),
              this.switcher.style.opacity = 1,
              this.events.bind("click", "bindClick")
          }
          ,
          de.prototype.disable = function () {
            this.options.disabled || (this.options.disabled = !0),
              this.element.disabled || (this.element.disabled = !0),
              this.element.readOnly || (this.element.readOnly = !0),
              this.switcher.style.opacity = this.options.disabledOpacity,
              this.destroy()
          }
      }),
      "object" == typeof exports ? module.exports = ae("switchery") : "function" == typeof define && define.amd ? define("Switchery", [], function () {
        return ae("switchery")
      }) : (this || window).Switchery = ae("switchery")
  }(),
  $(function () {
    function ae() {
      $("#name").html($("#field-name").val()),
        320 < $("#phone").width() ? 155 < $("#name").width() ? ($("#name").addClass("name-fixed"),
          220 < $("#name").width() && se(220)) : $("#name").removeClass("name-fixed") : 104 < $("#name").width() ? ($("#name").addClass("name-fixed"),
            151 < $("#name").width() && se(151)) : $("#name").removeClass("name-fixed")
    }
    function se(ke) {
      for (var Ce = $("#name").html(); $("#name").width() > ke;)
        Ce = Ce.substr(0, Ce.length - 1),
          Ce = Ce.replace(/\s*$/, ""),
          Ce += "...",
          $("#name").html(Ce),
          Ce = Ce.substr(0, Ce.length - 3)
    }
    function le(ke) {
      fe = ke.parent().parent().attr("id"),
        fe = fe.replace("message-", ""),
        ye = ke.val(),
        be = $("#bubble-" + fe).find("span").html(),
        $("#bubble-" + fe).find("span").html(ye),
        "" == ke.val() ? $("#bubble-" + fe).fadeOut() : "" == be && ($("#bubble-" + fe).css("top", "75px"),
          $("#bubble-" + fe).fadeIn({
            queue: !1
          }),
          $("#bubble-" + fe).animate({
            top: "0px"
          }, 500)),
        568 < $(window).width() ? (!ve && 668 < $(".body").height() && ($(".message-warning-big").fadeIn(500),
          ve = !0),
          !we && 1200 < $(".body").height() && ($(".message-warning-max").fadeIn(500),
            we = !0),
          ve && 668 >= $(".body").height() && ($(".message-warning-big").fadeOut(250),
            ve = !1),
          we && 1200 >= $(".body").height() && ($(".message-warning-max").fadeOut(250),
            we = !1)) : (!ve && 446 < $(".body").height() && ($(".message-warning-big").fadeIn(500),
              ve = !0),
              !we && 800 < $(".body").height() && ($(".message-warning-max").fadeIn(500),
                we = !0),
              ve && 446 >= $(".body").height() && ($(".message-warning-big").fadeOut(250),
                ve = !1),
              we && 800 >= $(".body").height() && ($(".message-warning-max").fadeOut(250),
                we = !1))
    }
    function de(ke) {
      $(".prompt").addClass("prompt-active"),
        $(".promptContent").html(ke)
    }
    function ce() {
      $(".prompt").removeClass("prompt-active"),
        setTimeout(function () {
          pe()
        }, 200)
    }
    function pe() {
      $("#promptContent").html("")
    }
    $(".text-message-form").length && document.forms[0].reset(),
      $("#preloader").fadeIn(0);
    for (var he = document.querySelectorAll(".switchery"), me = 0; me < he.length; me++)
      new Switchery(he[me]);
    $(document).on("click", ".sectionHeader", function () {
      var ke = $(this).parent().find(".settings");
      ke.slideToggle()
    }),
      $("#field-name").focusin(function () {
        "Name" == $(this).val() && $(this).val("")
      }),
      $("#field-name").focusout(function () {
        "" == $(this).val() && $(this).val("Name"),
          ae()
      }),
      $("#field-name").keyup(function () {
        ae()
      }),
      $("#title-name").click(function () {
        $("#field-name").focus()
      }),
      $("#field-blackout").change(function () {
        $(this).is(":checked") ? ($(".blackout").fadeIn(),
          $("#name").fadeOut()) : ($(".blackout").fadeOut(),
            $("#name").fadeIn())
      });
    var ge = 1;
    $("#addMessage").click(function () {
      messageBarHTML = "<div class=\"setting message\" id=\"message-" + ge + "\"><div class=\"settingOption\"><input type=\"text\" class=\"field-message\" name=\"message-" + ge + "\" placeholder=\"Message...\" /><div class=\"color grey colorActive\"></div><div class=\"color blue\"></div><div class=\"color green\"></div><select class=\"field-message-color\" name=\"message-color-" + ge + "\"><option>w</option><option>b</option><option>g</option></select></div></div>",
        bubbleHTML = "<div class=\"bubbleWrap\" id=\"bubble-" + ge + "\"><div class=\"bubble grey\"><span></span><div class=\"corner\"></div></div></div>",
        $(".messages").append(messageBarHTML),
        $(".body").append(bubbleHTML),
        $("#message-" + ge).find("input").focus(),
        ge++
    }),
      $(document).on("click", ".color", function () {
        $(this).parent().find(".color").removeClass("colorActive"),
          $(this).addClass("colorActive"),
          fe = $(this).parent().parent().attr("id"),
          fe = fe.replace("message-", ""),
          $("#bubble-" + fe).find(".bubble").removeClass("grey blue green"),
          $(this).hasClass("grey") ? ($("#bubble-" + fe).find(".bubble").addClass("grey"),
            $("#message-" + fe).find(".field-message-color").val("w")) : $(this).hasClass("blue") ? ($("#bubble-" + fe).find(".bubble").addClass("blue"),
              $("#message-" + fe).find(".field-message-color").val("b")) : ($("#bubble-" + fe).find(".bubble").addClass("green"),
                $("#message-" + fe).find(".field-message-color").val("g"))
      });
    var fe = 0
      , ye = ""
      , be = ""
      , ve = !1
      , we = !1;
    $(document).on("change keyup blur input", ".field-message", function () {
      le($(this))
    });
    var xe = 0;
    $(function () {
      $("#slider-level").slider({
        range: "min",
        value: 75,
        min: 0,
        max: 100,
        slide: function (ke, Ce) {
          $("#field-level").val(Ce.value + "%"),
            $(".percent").html(Ce.value + "%"),
            xe = Math.ceil(30 * Ce.value / 100),
            $(".juice").css("width", xe),
            20 >= Ce.value ? $(".juice").css("background-color", "#ff3b30") : $(".juice").css("background-color", "#000")
        }
      }),
        $("#field-level").val($("#slider-level").slider("value") + "%")
    }),
      $("#field-percent").change(function () {
        $(this).is(":checked") ? $(".percent").fadeIn() : $(".percent").fadeOut()
      }),
      $("#field-battery").change(function () {
        $(this).is(":checked") ? $(".battery").fadeIn() : $(".battery").fadeOut()
      }),
      $(function () {
        $("#slider-signal").slider({
          range: "min",
          value: 3,
          min: 0,
          max: 5,
          slide: function (ke, Ce) {
            $("#field-signal").val(Ce.value),
              $("#barsAmount, #barsAmountSetting").removeClass("bars0 bars1 bars2 bars3 bars4 bars5"),
              $("#barsAmount, #barsAmountSetting").addClass("bars" + Ce.value)
          }
        }),
          $("#field-signal").val($("#slider-signal").slider("value"))
      }),
      $("#field-network").keyup(function () {
        $(".network").html($(this).val())
      }),
      $("#title-network").click(function () {
        $("#field-network").focus()
      }),
      $("#field-connection").change(function () {
        "WiFi" == $(this).val() ? $(".connection").html("<img src='images/icon_wifi.png' class='icon-wifi' />") : "none" == $(this).val() ? $(".connection").html("") : $(".connection").html($(this).val())
      }),
      $("#title-connection").click(function () {
        $("#field-connection").focus()
      }),
      $("#field-airplane").change(function () {
        $(this).is(":checked") ? ($(".connectionWrapper").fadeOut(),
          $(".airplane").css("left", "-30px"),
          $(".airplane").fadeIn({
            queue: !1
          }),
          $(".airplane").animate({
            left: "0px"
          }, 500)) : ($(".connectionWrapper").fadeIn(),
            $(".airplane").fadeOut({
              queue: !1
            }),
            $(".airplane").animate({
              left: "120px"
            }, 450))
      }),
      $("#field-time").keyup(function () {
        $(".time").html($(this).val())
      }),
      $("#title-time").click(function () {
        $("#field-time").focus()
      }),
      $("#field-bluetooth").change(function () {
        $(this).is(":checked") ? $(".bluetooth").fadeIn() : $(".bluetooth").fadeOut()
      }),
      $("#field-alarm").change(function () {
        $(this).is(":checked") ? $(".alarm").fadeIn() : $(".alarm").fadeOut()
      }),
      $("#field-lock").change(function () {
        $(this).is(":checked") ? $(".lock").fadeIn() : $(".lock").fadeOut()
      }),
      $("#field-disturb").change(function () {
        $(this).is(":checked") ? $(".moon").fadeIn() : $(".moon").fadeOut()
      }),
      $("#field-messageArea").change(function () {
        $(".messageArea").html($(this).val())
      }),
      $("#title-messageArea").click(function () {
        $("#field-messageArea").focus()
      }),
      $("#field-sendButton").change(function () {
        "Microphone" == $(this).val() ? $(".sendButton").html("<img src='/images/icon_mic.png' class='icon-mic' />") : $(".sendButton").html("<img src='/images/icon_send.png' class='icon-send' />")
      }),
      $("#title-sendButton").click(function () {
        $("#field-sendButton").focus()
      }),
      $("#createButton").click(function () {
        $(this).hasClass("disabledButton") || ($(this).addClass("disabledButton"),
          $(this).html("Creating Image..."),
          $(".phoneSmall").removeClass("phoneSmall"),
          html2canvas($("#phone")).then(function (ke) {
            $("#display").append(ke);
            var Ce = ke.toDataURL("image/png");
            $("#base64").val(Ce),
              $("#submit").click()
          }))
      }),
      $(window).keydown(function (ke) {
        if (13 == ke.keyCode)
          return ke.preventDefault(),
            !1
      }),
      $(".mobile-menu-icon").click(function () {
        $(".mobile-menu").toggleClass("mobile-menu-active"),
          $(".mobile-menu-bg").toggleClass("mobile-menu-bg-active")
      }),
      $(".mobile-menu-bg").click(function () {
        $(".mobile-menu").toggleClass("mobile-menu-active"),
          $(".mobile-menu-bg").toggleClass("mobile-menu-bg-active")
      }),
      $(".title-app-clickable").click(function () {
        $(".mobile-menu").toggleClass("mobile-menu-active"),
          $(".mobile-menu-bg").toggleClass("mobile-menu-bg-active")
      }),
      $(document).on("click", ".savedButton-delete", function () {
        var ke = $(this).attr("deletelink");
        de("<h4>Delete Image</h4><p>Are you sure you want to delete this image?</p><div class='android-buttons'><div class='android-button android-button-cancel'>Cancel</div><a class='android-button android-button-delete android-button-last' href='" + ke + "'>Delete</a></div>")
      }),
      $(".promptBG").click(function () {
        ce()
      }),
      $(".promptExitButton").click(function () {
        ce()
      }),
      $(".prompt").on("click", ".android-button-cancel", function () {
        ce()
      })
  }),
  $(function () {
    function ae() {
      var Ne = $(".tutorial-step").length;
      $(".tutorial-step").each(function (Be) {
        $(this).addClass("tutorial-step-" + Be),
          0 == Be && $(this).addClass("tutorial-step-first"),
          Be == Ne - 1 && $(this).addClass("tutorial-step-last")
      }),
        Re = $(window).width(),
        be = 0,
        ve = $(".tutorial-steps"),
        Ce = $(".tutorial-steps .triangle"),
        se(be),
        xe = !0
    }
    function se(Ne) {
      !0 == xe && (we = $(".tutorial-step-" + Ne),
        $(".tutorial-step").hide(),
        we.show(),
        we.hasClass("tutorial-step-0") ? ve.addClass("tutorial-steps-first") : (ve.removeClass("tutorial-steps-first"),
          we.hasClass("tutorial-step-last") ? ve.addClass("tutorial-steps-last") : ve.removeClass("tutorial-steps-last")),
        $(".tutorial-highlight").removeClass("tutorial-highlight"),
        ke = we.attr("tutorial-highlight"),
        ke ? (ke = $(ke),
          ke.addClass("tutorial-highlight"),
          he = ke.offset(),
          me = he.top,
          ge = he.left,
          fe = ke.outerHeight(),
          ye = ke.outerWidth(),
          Ie = we[0].hasAttribute("tutorial-position") && "" != we.attr("tutorial-position") ? we.attr("tutorial-position") : Oe,
          ve.removeClass("tutorial-steps-default"),
          ve.removeClass("tutorial-position-bottom"),
          ve.removeClass("tutorial-position-top"),
          ve.removeClass("tutorial-position-left"),
          ve.removeClass("tutorial-position-right"),
          "bottom" == Ie ? (Ee = me + fe + Te,
            Se = ge + ye / 2 - ve.outerWidth() / 2,
            ve.addClass("tutorial-position-bottom")) : "top" == Ie ? (Ee = me - ve.outerHeight() - Te,
              Se = ge + ye / 2 - ve.outerWidth() / 2,
              ve.addClass("tutorial-position-top")) : "left" == Ie ? (Ee = me + fe / 2 - ve.outerHeight() / 2,
                Se = ge - ve.outerWidth() - Te,
                ve.addClass("tutorial-position-left")) : "right" == Ie && (Ee = me + fe / 2 - ve.outerHeight() / 2,
                  Se = ge + ke.outerWidth() + Te,
                  ve.addClass("tutorial-position-right")),
          568 > $(window).width() && (Ie = we[0].hasAttribute("tutorial-position-mobile") && "" != we.attr("tutorial-position-mobile") ? we.attr("tutorial-position-mobile") : Oe,
            ve.removeClass("tutorial-steps-default"),
            ve.removeClass("tutorial-position-bottom"),
            ve.removeClass("tutorial-position-top"),
            ve.removeClass("tutorial-position-left"),
            ve.removeClass("tutorial-position-right"),
            "bottom" == Ie ? (Ee = me + fe + Te,
              Se = ge + ye / 2 - ve.outerWidth() / 2,
              ve.addClass("tutorial-position-bottom")) : "top" == Ie && (Ee = me - ve.outerHeight() - Te,
                Se = ge + ye / 2 - ve.outerWidth() / 2,
                ve.addClass("tutorial-position-top"))),
          ve.css("top", Ee + "px"),
          ve.css("left", Se + "px")) : ve.addClass("tutorial-steps-default"),
        Ae = $(window).scrollTop(),
        Le = Ae + $(window).height(),
        (ve.offset().top < Ae || ve.offset().top + ve.outerHeight() > Le) && ("top" == Ie ? $("html, body").animate({
          scrollTop: ve.offset().top - 20
        }, 200) : $("html, body").animate({
          scrollTop: ve.offset().top + ve.outerHeight() - $(window).height() + 20
        }, 200)))
    }
    function le() {
      be++,
        se(be)
    }
    function de() {
      be--,
        se(be)
    }
    function ce() {
      setTimeout(function () {
        se(be)
      }, 100)
    }
    function pe() {
      $(".tutorial").addClass("tutorial-exited"),
        $(".footerSection").addClass("tutorial-exited-footerSection"),
        $(".tutorial-highlight").removeClass("tutorial-highlight")
    }
    function ue() {
      $(".tutorial").removeClass("tutorial-exited"),
        $(".footerSection").removeClass("tutorial-exited-footerSection"),
        se(be)
    }
    var he, me, ge, fe, ye, be, ve, we, ke, Ce, Ee, Se, Ie, Ae, Le, Re, xe = !1, Te = 13, Oe = "bottom";
    $(".tutorial").length && setTimeout(function () {
      ae()
    }, 100),
      $(".tutorial").on("click", ".tutorial-control-next", function () {
        le()
      }),
      $(".tutorial").on("click", ".tutorial-control-prev", function () {
        de()
      }),
      $(".tutorial").on("click", ".tutorial-exit-button", function () {
        pe()
      }),
      $(".tutorial").on("click", ".tutorial-steps-last .tutorial-control-next", function () {
        pe(),
          be = 0
      }),
      $(document).on("click", ".tutorial-restart-button", function () {
        ue()
      }),
      $(window).resize(function () {
        Re != $(window).width() && (Re = $(window).width(),
          ce())
      }),
      $(document).on("click", "#addMessage", function () {
        4 == be ? ce() : 5 == be && ce()
      }),
      $(document).on("click", ".sectionHeader", function () {
        7 == be && setTimeout(function () {
          ce()
        })
      })
  });
