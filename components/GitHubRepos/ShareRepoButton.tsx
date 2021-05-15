import React from 'react';
import {Share, Button} from 'react-native';

const ShareRepoButton: React.FC<{repoName: string; repoUrl: string}> = ({
  repoName,
  repoUrl,
}) => {
  const onShare = async () => {
    await Share.share({
      message: repoName,
      url: repoUrl,
    });
  };

  return <Button onPress={onShare} title="Share" />;
};

export default ShareRepoButton;
