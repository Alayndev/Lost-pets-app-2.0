import {
  atom,
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export const useDropzoneAtom = () => useRecoilState(dropzoneAtom);
export const useDropzoneAtomValue = () => useRecoilValue(dropzoneAtom);
export const useSetDropzoneAtom = () => useSetRecoilState(dropzoneAtom);
const dropzoneAtom: RecoilState<{ dropImage: any }> = atom({
  key: "dropzone",
  default: {
    dropImage: null,
  },
});
