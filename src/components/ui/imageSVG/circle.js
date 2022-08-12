import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Mask, LinearGradient, Stop, Rect, Use} from "react-native-svg"
import { Text } from 'react-native'

export function Clock(color='#fff', width=16, height=16) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.515 1.019A7.001 7.001 0 008 1V0a8 8 0 01.589.022l-.074.997zm2.004.45a7.005 7.005 0 00-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.017 7.017 0 00-.439-.27l.493-.87c.342.194.67.412.979.654l-.615.789a7.005 7.005 0 00-.418-.302v-.001zm1.834 1.79a6.994 6.994 0 00-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.052 7.052 0 00-.214-.468l.893-.45c.177.351.327.715.45 1.088l-.95.313a6.98 6.98 0 00-.179-.483zm.53 2.507a6.991 6.991 0 00-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025h-.001zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123c-.048.39-.125.776-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.104 8.104 0 01-.401.432l-.707-.707z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1a7 7 0 104.95 11.95l.707.707A8.002 8.002 0 118 0v1z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"
        fill={color}
      />
    </Svg>
  )
  }


export function Cycle(color='#fff', width=17, height=16) {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 16" fill="none">
      <G
        clipPath="url(#prefix__clip0)"
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
      >
        <Path d="M16.945 9.738l-1.439-.426c.007-.133.017-.264.017-.396 0-3.53-2.419-6.593-5.752-7.281L9.51 2.996c2.709.561 4.675 3.049 4.675 5.92v.006l-1.302-.385a.586.586 0 00-.213.781l1.182 2.207c.15.276.486.375.754.223l2.127-1.229a.586.586 0 00.212-.781zM2.438 8.626c0-2.353 1.326-4.454 3.3-5.44l.612 1.658a.589.589 0 00.788-.314l1.071-2.49a.63.63 0 00-.304-.818l-2.4-1.11a.587.587 0 00-.788.313l.541 1.465C2.778 3.083 1.1 5.695 1.1 8.627c0 .824.135 1.646.404 2.443l1.262-.457a6.246 6.246 0 01-.328-1.987zM8.713 14.607c-1.046 0-2.065-.263-2.955-.811l1.127-1.188a.59.59 0 00-.603-.595H3.656a.606.606 0 00-.593.625l.018 2.728a.606.606 0 00.604.614l1.116-1.176a6.923 6.923 0 003.912 1.19c2.013 0 3.946-.895 5.305-2.454l-.992-.931c-1.106 1.27-2.678 1.998-4.313 1.998z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill={color} d="M0 0h17v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function Rank(color='#fff', width=17, height=16) {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 16" fill="none">
      <Path
        d="M12.484 5v1h2.17l-6.287 5.918-2.39-2.25-3.431 3.229.751.707 2.68-2.521 2.39 2.25 7.04-6.625v2.043h1.062V5h-3.985V5z"
        fill={color}
      />
      <Path d="M1.594 3.25H.53V15.5H16.47v-1H1.594V3.25z" fill={color} />
    </Svg>
  )
}

export function QRIcon(color='#fff', width=17, height=16) {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 16" fill="none">
      <Path
        d="M0 7.111h1.889V8.89H0V7.11zm7.556-5.333h1.888v3.555H7.556V1.778zM5.666 7.11h3.778v3.556H7.556V8.889h-1.89V7.11zm5.667 0h1.89V8.89h1.888V7.11H17V8.89h-1.889v1.778H17v3.555h-1.889V16h-1.889v-1.778H9.444V16H7.556v-3.556h3.777v-1.777h1.89V8.889h-1.89V7.11zm3.778 7.111v-3.555h-1.889v3.555h1.89zM11.333 0H17v5.333h-5.667V0zm1.89 1.778v1.778h1.888V1.778h-1.889zM0 0h5.667v5.333H0V0zm1.889 1.778v1.778h1.889V1.778h-1.89zM0 10.667h5.667V16H0v-5.333zm1.889 1.777v1.778h1.889v-1.778h-1.89z"
        fill={color}
      />
    </Svg>
  )
}

export function StepsIcon(color='#fff', width=12, height=16) {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 16" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M6.155 0C5.732 0 5.37.15 5.07.452a1.481 1.481 0 00-.452 1.086c0 .424.15.786.452 1.087.301.301.663.452 1.086.452.423 0 .786-.15 1.087-.452.301-.301.452-.663.452-1.087 0-.423-.15-.785-.452-1.086A1.481 1.481 0 006.155 0zm-3.51 15.539l1.626-2.664c.18-.295.314-.59.404-.885l.557-1.846 1.683 1.76 1.471 3.529a.899.899 0 00.846.567.89.89 0 00.654-.27.89.89 0 00.27-.653c0-.11-.023-.224-.068-.346l-1.346-3.317a2.744 2.744 0 00-.197-.428 3.55 3.55 0 00-.322-.38L6.328 8.567l.577-2.711.539 1.048a.988.988 0 00.423.471l1.99 1.01c.308.153.51.23.606.23.18 0 .327-.057.442-.173A.599.599 0 0011.08 8c0-.263-.122-.458-.366-.587L8.511 6.24l-.865-1.98c-.16-.353-.372-.545-.635-.577l-2.202-.25c-.205-.02-.48.041-.827.182l-2.327.923a1.133 1.133 0 00-.375.26.908.908 0 00-.24.375C.534 6.481.2 7.353.04 7.788A.52.52 0 00.002 8c0 .167.06.31.182.433a.591.591 0 00.433.182.92.92 0 00.39-.091c.13-.06.216-.14.254-.236l.98-2.576 2.02-.76-1.413 6.606-1.808 3.077a.95.95 0 00-.115.442c0 .256.09.474.269.654.18.18.397.269.654.269.346 0 .612-.154.798-.461z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill={color} d="M0 0h11.08v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function ProfileQRCode() {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
      <Path
        d="M5.208 5.208h2.084v2.084H5.208V5.208zM1.042 1.042h10.416v10.416H1.042V1.042zm2.083 2.083v6.25h6.25v-6.25h-6.25zm2.083 14.583h2.084v2.084H5.208v-2.084zm-4.166-4.166h10.416v10.416H1.042V13.542zm2.083 2.083v6.25h6.25v-6.25h-6.25zm10.417-2.083h4.166v2.083h2.084v-2.083h4.166v2.083h-4.166v2.083h4.166v6.25h-4.166v-2.083h-4.167v2.083h-2.083v-2.083h2.083v-2.083h-2.083v-6.25zm8.333 8.333v-2.083h-2.083v2.083h2.083zm-2.083-4.167h-2.084v-2.083h-2.083v4.167h4.167v-2.084zM23.646 3.49L22.604 4.53 20.47 2.448l1.041-1.042a.562.562 0 01.803 0l1.333 1.282a.562.562 0 010 .802zM13.542 9.313L19.865 3 22 5.135l-6.312 6.323h-2.146V9.313z"
        fill="#fff"
      />
    </Svg>
  )
  
}

export function ObjectsIcon() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Path
        d="M23.739 2.5H11.262A2.511 2.511 0 008.75 5.013v7.046L2.872 17.86A1.25 1.25 0 003.75 20v6.25A1.25 1.25 0 005 27.5h20a1.25 1.25 0 001.25-1.25V5.011A2.51 2.51 0 0023.739 2.5zM13.652 18.889V25H6.25v-6.96l3.734-3.686 3.668 3.754v.78zm2.598-7.639h-2.5v-2.5h2.5v2.5zm5 10h-2.5v-2.5h2.5v2.5zm0-5h-2.5v-2.5h2.5v2.5zm0-5h-2.5v-2.5h2.5v2.5z"
        fill="#0062D5"
      />
      <Path d="M8.75 18.75h2.5v2.5h-2.5v-2.5z" fill="#0062D5" />
    </Svg>
  )
}

export function UserIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 2a14 14 0 100 28 14 14 0 000-28zm8 22.919v-.608A5.21 5.21 0 0019 19h-6a5.2 5.2 0 00-4.99 5.31c0 .011-.01.022-.01.033v.585a12.005 12.005 0 1116-.01v.001z"
        fill="#770F0F"
      />
      <Path d="M16 7a5 5 0 100 10 5 5 0 000-10z" fill="#770F0F" />
    </Svg>
  )
}

export function Attributes() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Path
        d="M29.757 7.04H2.253c-.884 0-1.608.804-1.608 1.6 0 .795.724 1.6 1.608 1.6h.389v3.2h26.765v-3.2h.35c.885 0 1.608-.805 1.608-1.6 0-.796-.723-1.6-1.608-1.6zm-13.752 4.813a.816.816 0 01-.804-.827c0-.456.36-.827.804-.827.445 0 .804.37.804.827 0 .456-.36.827-.804.827zM2.642 19.839h26.765V14.72H2.642v5.119zm13.363-3.44c.445 0 .804.37.804.827 0 .457-.36.826-.804.826a.815.815 0 01-.804-.826c0-.457.36-.827.804-.827zM2.642 24.253v3.72c0 .455.057.828.499.828h3.215c.443 0 .643-.373.643-.827v-2.375H25.05v2.375c0 .454.161.827.603.827h3.216c.441 0 .538-.373.538-.827V21.12H2.642v3.133zM16.005 22.6c.445 0 .804.37.804.826 0 .458-.36.826-.804.826a.814.814 0 01-.804-.826c0-.455.36-.826.804-.826z"
        fill="#E4AE45"
      />
    </Svg>
  )
}

export function ArrowRight() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M6 15l5-5-5-5 1-2 7 7-7 7-1-2z" fill="#C4C4C4" />
    </Svg>
  )
}
export function PeopleIcon() {
  return (
    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M2 2.66667C1.26667 2.66667 0.666667 3.26667 0.666667 4C0.666667 4.73333 1.26667 5.33333 2 5.33333C2.73333 5.33333 3.33333 4.74 3.33333 4C3.33333 3.26 2.74 2.66667 2 2.66667ZM6.66667 1.33333C6.40296 1.33333 6.14517 1.41153 5.92591 1.55804C5.70664 1.70455 5.53574 1.91279 5.43483 2.15642C5.33391 2.40006 5.30751 2.66815 5.35895 2.92679C5.4104 3.18543 5.53739 3.42301 5.72386 3.60948C5.91033 3.79595 6.14791 3.92293 6.40655 3.97438C6.66519 4.02583 6.93328 3.99942 7.17691 3.89851C7.42055 3.79759 7.62878 3.62669 7.77529 3.40743C7.9218 3.18816 8 2.93038 8 2.66667C8 1.92667 7.40667 1.33333 6.66667 1.33333ZM11.3333 0C10.6 0 10 0.6 10 1.33333C10 2.06667 10.6 2.66667 11.3333 2.66667C12.0667 2.66667 12.6667 2.07333 12.6667 1.33333C12.6667 0.593333 12.0733 0 11.3333 0ZM1 6C0.446667 6 0 6.44667 0 7V10H0.666667V13.3333H3.33333V10H4V7C4 6.44667 3.55333 6 3 6H1ZM5.66667 4.66667C5.11333 4.66667 4.66667 5.11333 4.66667 5.66667V8.66667H5.33333V12H8V8.66667H8.66667V5.66667C8.66667 5.11333 8.22 4.66667 7.66667 4.66667H5.66667ZM10.3333 3.33333C9.78 3.33333 9.33333 3.78 9.33333 4.33333V7.33333H10V10.6667H12.6667V7.33333H13.3333V4.33333C13.3333 3.78 12.8867 3.33333 12.3333 3.33333H10.3333Z" fill="white"/>
</Svg>
  )
}

export function errorData(color='#000') {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 16 16"
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

 export function successData(color='#000') {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 16 16"
    >
      <Path
        fill={color}
        d="M8 .889A7.111 7.111 0 108 15.11 7.111 7.111 0 008 .889zm0 13.333A6.222 6.222 0 118 1.778a6.222 6.222 0 010 12.444z"
      ></Path>
      <Path
        fill={color}
        d="M12.444 5.378a.444.444 0 00-.626 0l-4.934 4.91-2.666-2.666a.451.451 0 10-.662.614l3.328 3.32 5.56-5.547a.443.443 0 000-.631z"
      ></Path>
    </Svg>
  );
 }
 export function RemoveBypassRankPhoto() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <Path
        fill="red"
        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5 11H5V9h10v2z"
      ></Path>
    </Svg>
  );
}
export function AddNewBypassRankPhoto() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      fill="none"
      viewBox="0 0 64 64"
    >
      <Path
        fill="#000"
        d="M10 0a9.78 9.78 0 00-1.948.192l.776 3.92A6.04 6.04 0 0110 4h1.832V0H10zm9.168 0H15.5v4h3.668V0zM26.5 0h-3.668v4H26.5V0zm7.332 0h-3.664v4h3.664V0zm7.336 0H37.5v4h3.668V0zM48.5 0h-3.668v4H48.5V0zM54 0h-1.832v4H54c.4 0 .796.04 1.172.116l.776-3.924A10.04 10.04 0 0054 0zm8.316 4.44a10.045 10.045 0 00-2.76-2.756l-2.224 3.324a6.071 6.071 0 011.66 1.66l3.32-2.224.004-.004zM4.44 1.684a10.044 10.044 0 00-2.756 2.76l3.324 2.224a6.071 6.071 0 011.66-1.66L4.44 1.688v-.004zM64 10a9.78 9.78 0 00-.192-1.948l-3.92.776c.072.376.112.768.112 1.172v1.832h4V10zM.192 8.052A10.04 10.04 0 000 10v1.832h4V10c0-.4.04-.796.116-1.172L.192 8.052zM0 15.5v3.668h4V15.5H0zm64 3.668V15.5h-4v3.668h4zM0 22.832V26.5h4v-3.668H0zM64 26.5v-3.668h-4V26.5h4zM0 30.168v3.664h4v-3.664H0zm60 3.664h4v-3.664h-4v3.664zM0 37.5v3.668h4V37.5H0zm64 3.668V37.5h-4v3.668h4zM0 44.832V48.5h4v-3.668H0zM64 48.5v-3.668h-4V48.5h4zM0 52.168V54c0 .664.064 1.32.192 1.948l3.92-.776A6.04 6.04 0 014 54v-1.832H0zM64 54v-1.832h-4V54c0 .4-.04.796-.116 1.172l3.924.776A9.78 9.78 0 0064 54zM1.684 59.56a10.111 10.111 0 002.76 2.756l2.224-3.324a6.04 6.04 0 01-1.66-1.66l-3.32 2.224-.004.004zm57.876 2.756a10.111 10.111 0 002.756-2.76l-3.324-2.224a6.071 6.071 0 01-1.66 1.66l2.224 3.32.004.004zM8.052 63.808A9.78 9.78 0 0010 64h1.832v-4H10c-.4 0-.796-.04-1.172-.116l-.776 3.924zM54 64a9.78 9.78 0 001.948-.192l-.776-3.92A6.042 6.042 0 0154 60h-1.832v4H54zm-38.5 0h3.668v-4H15.5v4zm7.332 0H26.5v-4h-3.668v4zm7.336-4v4h3.664v-4h-3.664zm7.332 4h3.668v-4H37.5v4zm7.332 0H48.5v-4h-3.668v4zM34 18a2 2 0 00-4 0v12H18a2 2 0 000 4h12v12a2 2 0 004 0V34h12a2 2 0 000-4H34V18z"
      ></Path>
    </Svg>
  );
}
export function TimeBetweenBypass(color='#000', width=25, height=24) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 17 16"
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 2.026C12 .908 11.135 0 10.065 0h-3.12C5.877 0 5.01.908 5.01 2.026v3.536l2.021 2.427-2.021 2.448v3.516c0 1.118.866 2.025 1.935 2.025h3.12c1.069 0 1.935-.907 1.935-2.025v-3.578L9.906 8.001 12 5.625V2.026zM11 5L9 7.989 11 11v3a1 1 0 01-1 1H7a1 1 0 01-1-1v-3l2-3.011L6 5.02V2a1 1 0 011-1h3a1 1 0 011 1v3z"
        clipRule="evenodd"
      ></Path>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M10 14H7v-2l1.5-1.979L10 12v2zM10 4L8.521 5.979 7 4h3z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function ArLeft(color='#303F9F', width=35, height=35) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <G clipPath="url(#clip0_3090_11738)">
        <Path
          d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 7.5a.5.5 0 010 1H5.707l2.147 2.146a.501.501 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3090_11738">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function ArRight(color='#303F9F', width=35, height=35) {
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
  >
    <Path
      d="M8 0a8 8 0 110 16A8 8 0 018 0zM4.5 7.5a.5.5 0 100 1h5.793l-2.147 2.146a.501.501 0 00.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L10.293 7.5H4.5z"
      fill={color}
    />
  </Svg>
  )
}