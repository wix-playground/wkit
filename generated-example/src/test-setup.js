import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import { baseURL } from '../test/test-common';

wixAxiosConfig(axios, { baseURL });
